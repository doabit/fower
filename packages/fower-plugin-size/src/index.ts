import { FowerPlugin } from '@fower/types'

export const sizeMaps: Record<string, string[]> = {
  w: ['width'],
  h: ['height'],
  square: ['width', 'height'],
  circle: ['width', 'height', 'borderRadius'],
  minw: ['minWidth'],
  maxw: ['maxWidth'],
  minh: ['minHeight'],
  maxh: ['maxHeight'],
}

export function isMatch(key: string) {
  return /^([wh]|square|circle|min[hw]|max[hw])$/i.test(key)
}

export default (): FowerPlugin => {
  return {
    isMatch,
    handleAtom(atom) {
      const { key, value } = atom
      atom.style = sizeMaps[key.toLowerCase()].reduce<any>(
        (style, cur) => ({ ...style, [cur]: value }),
        {},
      )
      return atom
    },
  }
}
