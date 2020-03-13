export const generateRandomKey = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const clone = (items: any) =>
  items.map((item: any) => (Array.isArray(item) ? clone(item) : item));
