---
title: Quick Start
lang: en-US
---

# Quick Start

This section describe how to use Jirafa UI in your project.

## Usage

### Full Import

If you need all the component or don't care about the bundle size , it's more convenient to use full import.

```js
// main.js
import { createApp } from 'vue'
import Jirafa from 'jirafa'
import 'jirafa/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(Jirafa)
app.mount('#app')
```

### On-demand Import

[ ] Todo...

### Manually import

[ ] Todo...

## Typescript Support

Add the global component type definition to `compilerOptions.types` in `tsconfig.json`

If you use the `VS Code` IDE, we recommend using [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension.

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": ["jirafa/global"]
  }
}
```
