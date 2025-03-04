export const generateId = (length: number) => {
  return Math.floor(Math.random() * Math.pow(10, length));
};
