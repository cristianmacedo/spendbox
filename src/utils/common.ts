export const id = (length: number): string =>
  Math.random().toString(9).slice(2, length);

export default id;
