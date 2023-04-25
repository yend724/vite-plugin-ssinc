# Vite Plugin Ssinc

[Vite Plugin Ssinc](https://github.com/yend724/vite-plugin-ssinc) is a plugin for [Vite](https://vitejs.dev/) that allows for Server Side Includes like syntax (with only `#include` supported) to be used in HTML files.

## Installation

You can install the plugin using [npm](https://www.npmjs.com/):

```sh
npm install vite-plugin-ssinc
```

or [yarn](https://yarnpkg.com/):

```sh
yarn add vite-plugin-ssinc
```

## Usage

To use Vite Plugin Ssinc, add the following to your Vite configuration file.

```js
// vite.config.js
import vitePluginSsinc from 'vite-plugin-ssinc';

export default {
  plugins: [
    vitePluginSsinc({
      includeExtensions: ['shtml', 'html'],
    }),
  ],
};
```

In your HTML files, you can use SSI directives like so:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Vite Plugin Ssinc</title>
  </head>
  <body>
    <!--# include file="header.shtml" -->
    <h1>Welcome to Vite Plugin Ssinc</h1>
    <!--# include virtual="/footer.shtml" -->
  </body>
</html>
```

When Vite serves your site, the SSI directives will be processed and the included files will be included in the HTML response.

### Options

| Option              | Type               | Default  | Required | Description                                                                                                                            |
|---------------------|-------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------|
| `includeExtensions` | `Array<string>`   | `['shtml']` | No        | An array of file extensions that should be checked for SSI directives.                                                                  |
| `apply`              | `'serve' \| 'build'` | None    | No        | The mode in which the plugin should be applied. By default, the plugin will be applied in both development and production builds. |

## License

Vite Plugin Ssinc is licensed under the [MIT License](https://github.com/yend724/vite-plugin-ssinc/blob/main/LICENSE).