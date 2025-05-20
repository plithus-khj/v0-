let IS_RENDERED = false

export const setRendered = (v: boolean) => {
  IS_RENDERED = v
}

export const isRendered = () => {
  return IS_RENDERED
}
