import { Plugin, getValue, styli } from '@styli/core'
import { isBrowser, downFirst, isValidPropValue } from '@styli/utils'

export function isTextLineHeightKey(key: string) {
  return /^lh(None|Tight|Snug|Normal|Relaxed|Loose|-.+)?$/.test(key)
}

export function textLineHeightPropToStyle(prop: string, propValue: any): any {
  if (isValidPropValue(propValue)) {
    return {
      lineHeight: Array.isArray(propValue)
        ? propValue.map((v) => getValue(v))
        : getValue(propValue),
    }
  }

  const [, value = ''] = prop.match(/lh-?(\w+)?/) || []

  const leadings = styli.getTheme('lineHeight') || {}

  if (leadings[downFirst(value)]) {
    if (isBrowser) {
      return { lineHeight: leadings[downFirst(value)] }
    }

    // TODO: for rn
    return { lineHeight: 20 }
  }

  return {
    lineHeight: getValue(value),
  }
}

export default (): Plugin => {
  return {
    name: 'styli-plugin-line-height',
    isMatch: isTextLineHeightKey,
    onVisitProp(atom) {
      atom.style = textLineHeightPropToStyle(atom.propKey, atom.propValue)
      return atom
    },
  }
}
