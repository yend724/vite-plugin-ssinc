import path from 'node:path';
import fs from 'node:fs';
import type { Plugin } from 'vite';
import { formatOptions } from './utils.js';

export type Options = Partial<{
  includeExtensions: string[];
}>;
const vitePluginSsinc = (options: Options = {}): Plugin => {
  let projectRootPath = '';
  let updateAbsFilePath = '';

  const ssiRegex = new RegExp(
    `<!--#\\s*([a-z]+)\\s+[a-z]+=["'].*["']\\s*-->`,
    'g'
  );

  const { includeExtensions } = formatOptions(options);
  const includeCache: Record<string, string> = {};

  return {
    name: 'vite-plugin-ssinc',
    enforce: 'pre',

    config(config) {
      projectRootPath = path.resolve(config.root ?? '.');
    },

    handleHotUpdate({ server, file }) {
      updateAbsFilePath = file;
      const extension = path.extname(updateAbsFilePath);

      if (includeExtensions.indexOf(extension) !== -1) {
        server.ws.send({
          type: 'full-reload',
        });
      }
      return [];
    },

    async transformIndexHtml(html) {
      const matches = [...html.matchAll(ssiRegex)];

      await Promise.all(
        matches.map(async match => {
          const [target, command] = match;

          if (command === 'include') {
            const filePath = target.split(/["']/g)[1];
            const absFilePath = path.join(projectRootPath, filePath);
            const extension = path.extname(absFilePath);

            if (includeExtensions.indexOf(extension) === -1) {
              return (includeCache[absFilePath] = target);
            }

            const isFileUpdate = updateAbsFilePath === absFilePath;

            if (!isFileUpdate && includeCache[absFilePath]) {
              return includeCache[absFilePath];
            }

            let cache = '';
            try {
              const data = await fs.promises.readFile(absFilePath, 'utf8');
              cache = data.trim();
            } catch (error) {
              console.error(error);
              cache = target;
            }

            return (includeCache[absFilePath] = cache);
          }

          return match;
        })
      );

      return html.replace(ssiRegex, (target, command) => {
        if (command === 'include') {
          const filePath = target.split(/["']/g)[1];
          const absFilePath = path.join(projectRootPath, filePath);

          return includeCache[absFilePath];
        }

        return target;
      });
    },
  };
};

export default vitePluginSsinc;
