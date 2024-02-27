/**
 * @param {bigint} n 
 */
export default function factorSumSum(n) {
  let l = 1n, r, div;
  let sum = 0n;
  while (l <= n) {
    div = n / l;
    r = n / div;
    sum += (r * (r + 1n) / 2n - (l - 1n) * l / 2n) * div;
    l = r + 1n;
  }
  return sum;
}
