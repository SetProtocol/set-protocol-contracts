export const randomIntegerLessThan = (lessThan: number, greaterThan: number = 0) => {
  return Math.ceil(Math.random() * Math.floor(lessThan)) + greaterThan;
};
