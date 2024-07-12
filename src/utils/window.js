import { AsyncLocalStorage } from 'node:async_hooks'
import { createSVGWindow } from '@halfmatthalfcat/svgdom'

const storage = new AsyncLocalStorage()

export const globals = {
  get window() {
    return storage.getStore()
  },
  get document() {
    return storage.getStore()?.document
  }
}

export async function withWindow(fn) {
  return storage.run(createSVGWindow(), fn)
}
