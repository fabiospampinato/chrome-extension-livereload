# Chrome Extension Livereload

A tiny and basic livereload solution for chrome extensions.

Note that this doesn't enable HMR, which is more immediate and granular, instead the entire page will be reloaded.

## Install

```sh
npm install --save chrome-extension-livereload
```

## Usage

A `webview` strategy is provided, for reloading webview-backed extensibility entrypoints (newtab, options, devtools, popup, side panel etc.).

```ts
import livereload from 'chrome-extension-livereload/webview';

// Check for updates and reload the page automatically

livereload ();
```

## License

MIT © Fabio Spampinato
