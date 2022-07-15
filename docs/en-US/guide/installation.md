---
title: Installation
lang: en-US
---

# Installation

## Compatibility

Jirafa UI works on modern browsers that list bellow. If you really need to support outdated browsers, please add [Babel](https://babeljs.io/) and Polyfill yourself.

Jirafa UI is a Vue 3 based component library, Vue 3 no longer supports IE11, Jirafa UI does not IE11 either.

| ![IE](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) | ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) |
| :--------------------------------------------------------------------: | :-------------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
|                               Edge ≥ 79                                |                                   Firefox ≥ 78                                    |                                  Chrome ≥ 64                                   |                                  Safari ≥ 12                                   |

## Package Manager Using

**We recommend using the package manager (NPM, [Yarn](https://classic.yarnpkg.com/lang/en/), [pnpm](https://pnpm.io/)) to install Jirafa UI**,
so that you can utilize bundlers like [Vite](https://vitejs.dev) and
[webpack](https://webpack.js.org/).

```shell
# Choose a package manager you like.

# NPM
$ npm install jirafa --save

# Yarn
$ yarn add jirafa

# pnpm
$ pnpm install jirafa
```

## Import in Browser

### unpkg

```html
<head>
  <!-- import style -->
  <link rel="stylesheet" href="//unpkg.com/jirafa/index.css" />
  <!-- import vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- import jirafa -->
  <script src="//unpkg.com/jirafa"></script>
</head>
```

### jsdelivr

```html
<head>
  <!-- import style -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/jirafa/index.css" />
  <!-- import vue 3 -->
  <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- import jirafa -->
  <script src="//cdn.jsdelivr.net/npm/jirafa"></script>
</head>
```

If you are installing via package manager and want to use it with a packaging tool, please read the next section: [Quick Start](/en-US/guide/quickstart).
