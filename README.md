# svgals

SVG.js + svgdom + AsyncLocalStorage

`svgals` is a combination of technologies to enable isolated SVG creation in Node-specific contexts only. Specifically, `svgals` seeks to
create isolated `documents` to create SVGs between async contexts, such as Serverless handler requests. 

Originally in SVG.js + svgdom, you needed to create a new svgdom document instance via `createSVGWindow` and then attach that window to a **global** instance (`registerWindow`),
which doesn't necessarily work in async contexts as you may override an existing document.

`svgals` leverages Node's `AsyncLocalStorage` construct to persist a `window` in any given async context so that each async context can operate on windows independently of each other.

## Usage

```javascript
// Cloudflare Worker

import { SVG, withWindow } from '@svg.js'

export default {
    async fetch(req) {
        return withWindow(() => {
            const svg = SVG().rect(100, 100).fill('#f06').svg();

            return Response(svg, {
                headers: {
                    'Content-Type': 'image/svg+xml',
                }
            })
        });
    }
}
```

## Installation

### Npm:

```sh
npm install @halfmatthalfcat/svgals
```

### Yarn:

```sh
yarn add @halfmatthalfcat/svgals
```

## Documentation

* [SVG.js](https://svgjs.dev/docs/3.0/)
* [svgdom](https://github.com/svgdotjs/svgdom)
* [AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage)

