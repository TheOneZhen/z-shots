import type { PluginOption } from "vite"

/** generate FS for chrome extensions development */
export default function (option: {}): PluginOption {
  return {
    name: "vite-plugin-react-transform",
    transform (src, id) {
      if (/package.json/.test(id)) {
        return {
          code: '',
          map: 'manifest.json'
        }
      } else if (/contents/.test(src)) {
        return {
          map: ''
        }
      } else if (/backgrounds/.test(src)) {
        return {
          map: ''
        }
      }
    }
  }
}