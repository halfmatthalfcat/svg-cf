# svg-cf

_SVG.js + svgdom + AsyncLocalStorage for usage in Cloudflare Workers_

`svg-cf` is a combination of libraries and Node APIs to enable isolated SVG creation in Cloudflare Workers.

Originally in SVG.js + svgdom, you needed to create a new svgdom window/document instance via `createSVGWindow` and then attach that window to a **global, singleton** instance (`registerWindow`),
which doesn't necessarily work in async contexts as you may have concurrent requests operating on the same document.

`svg-cf` leverages Node's `AsyncLocalStorage` construct to persist a `window` in any given async context so that each async context can operate on windows independently of each other.

`svg-cf` also utilizes `svgdom-cf`, a fork of svgdom that is compatible
for running in Cloudflare Workers. Check out the [@halfmatthalfcat/svgdom-cf](https://github.com/halfmatthalfcat/svgdom-cf) repo for more info.

## Usage

```js
import { SVG, withWindow } from '@halfmatthalfcat/svg-cf'

export default {
  async fetch(req) {
    return withWindow(() => {
      const svg = SVG().size(100, 100)
      svg.rect(100, 100).fill('green')

      return Response(svg.svg(), {
        headers: {
          'Content-Type': 'image/svg+xml'
        }
      })
    })
  }
}
```

## Installation

### Npm:

```sh
npm install @halfmatthalfcat/svg-cf
```

### Yarn:

```sh
yarn add @halfmatthalfcat/svg-cf
```

## Resources

- [SVG.js](https://svgjs.dev/docs/3.0/)
- [svgdom-cf](https://github.com/halfmatthalfcat/svgdom-cf)
- [AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage)
