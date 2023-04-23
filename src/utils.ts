import { DEFAULT_OPTIONS } from './config';
import type { Options } from './index';

export const formatOptions = (_options: Options): Required<Options> => {
  const includeExtensions =
    _options?.includeExtensions ?? DEFAULT_OPTIONS['includeExtensions'];

  const options = {
    includeExtensions: includeExtensions.map(ex => '.' + ex),
  };

  return options;
};
