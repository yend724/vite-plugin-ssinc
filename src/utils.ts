import { DEFAULT_OPTIONS } from './config.js';
import type { Options } from './index.js';

export const formatOptions = (_options: Options): Required<Options> => {
  const includeExtensions =
    _options?.includeExtensions ?? DEFAULT_OPTIONS['includeExtensions'];

  const options = {
    includeExtensions: includeExtensions.map(ex => '.' + ex),
  };

  return options;
};
