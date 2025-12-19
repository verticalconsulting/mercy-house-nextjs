// Google Analytics gtag types
export interface GtagWindow extends Window {
  gtag?: (
    command: 'event' | 'config' | 'set' | 'get',
    targetId: string,
    config?: Record<string, unknown>
  ) => void
}

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined') {
    const win = window as GtagWindow
    if (win.gtag) {
      win.gtag('event', eventName, parameters)
    }
  }
}
