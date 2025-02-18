export const centToUsd = (cent: number | string | bigint): string => {
  const centString = cent.toString();
  const cents =
    centString.length > 2 ? centString.slice(-2) : centString.padStart(2, '0');

  const dollars = centString.slice(0, centString.length - 2) || '0';

  return `$${dollars},${cents}`;
};
