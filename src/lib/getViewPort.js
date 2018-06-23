export function getWidth () {
  if (!document) {
    return 0
  }

  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
}

export function getHeight () {
  if (!document) {
    return 0
  }

  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}

export function getAspectRatio () {
  if (!document) {
    return 1
  }
  return getWidth() / getHeight()
}

