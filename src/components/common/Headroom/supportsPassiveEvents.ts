/**
 * Detects browser support for event listeners with options
 * @returns Boolean
 */
export default function supportsPassiveEvents() {
  let isSupported = false

  try {
    const options = Object.defineProperty({}, 'passive', {
      get: () => {
        isSupported = true
        return false
      },
    })

    window.addEventListener('test', () => {}, options)
    window.removeEventListener('test', () => {})
  } catch (error) {}

  return isSupported
}
