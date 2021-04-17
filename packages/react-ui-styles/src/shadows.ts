function createShadow(offsetX: number, offsetY: number, blur: number, spread: number, alpha: number) {
  return `${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(0, 0, 0, ${alpha})`;
}

const shadows: string[] = [
  'none',
  createShadow(0, 1, 2, 0, 0.5),
  [
    createShadow(0, 1, 3, 0, 0.1),
    createShadow(0, 1, 2, 0, 0.6)
  ].join(','),
  [
    createShadow(0, 4, 6, -3, 0.1),
    createShadow(0, 2, 4, -1, 0.06)
  ].join(','),
  [
    createShadow(0, 10, 15, -3, 0.1),
    createShadow(0, 4, 6, -2, 0.05)
  ].join(','),
  [
    createShadow(0, 20, 25, -5, 0.1),
    createShadow(0, 10, 10, -5, 0.4)
  ].join(','),
  createShadow(0, 25, 50, -12, 0.25)
];

export default shadows;
