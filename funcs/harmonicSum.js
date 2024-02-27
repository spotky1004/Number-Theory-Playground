/**
 * @param {bigint} n 
 */
export default function harmonicSum(n) {
  let l = 1n, r, div;
  let sum = 0n;
  while (l <= n) {
    div = n / l;
    r = n / div;
    sum += (r - l + 1n) * div;
    l = r + 1n;
  }
  return sum;
}
