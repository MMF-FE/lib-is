/**
 * 是否 ios
 */
export const iOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)

/**
 * 是否 android
 */
export const android = /(Android)/i.test(navigator.userAgent)

/**
 * 是否从主屏启动
 */
export const standalone = (() => {
    if (iOS) {
        // @ts-ignore
        return navigator.standalone as boolean
    }
    if (android) {
        return window.matchMedia('(display-mode: standalone)').matches
    }
    return false
})()

/**
 * 是否在 iframe 里
 */
export const inIframe = (() => {
    if (typeof window === 'undefined') return false
    return window.frames.length !== window.parent.frames.length
})()
