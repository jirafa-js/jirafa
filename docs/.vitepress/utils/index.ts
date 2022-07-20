export const throttleAndDebounce = (fn: () => any, delay: number) => {
  let called = false
  let timer: ReturnType<typeof setTimeout>

  return () => {
    if (timer) {
      clearTimeout(timer)
    }

    if (!called) {
      fn()
      called = true
      setTimeout(() => {
        called = false
      }, delay)
    } else {
      timer = setTimeout(fn, delay)
    }
  }
}
