import { DEFAULT_OPTIONS } from './options.js';
import type { Options } from './index.js';

export const formatOptions = (_options: Options) => {
  const includeExtensions =
    _options?.includeExtensions ?? DEFAULT_OPTIONS['includeExtensions'];

  const options = {
    ..._options,
    includeExtensions: includeExtensions.map(ex => '.' + ex),
  };

  return options;
};
