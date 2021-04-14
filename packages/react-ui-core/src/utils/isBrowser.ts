const hasDocument: boolean = typeof document === 'object' && document !== null;
const hasWindow: boolean = typeof window === 'object' && window !== null && window.self === window;

export function isBrowser(): boolean {
  return hasDocument && hasWindow;
}
