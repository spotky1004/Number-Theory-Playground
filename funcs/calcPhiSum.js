const phiSumCache = new Map();
/**
 * @param {bigint} n 
 * @param {bigint[]} phiSums 
 * @param {bigint} mod 
 * @returns {bigint} 
 */
export default function clacPhiSum(n, phiSums, mod) {
  if (n <= phiSumCount) return BigInt(phiSums[n]);
  if (phiSumCache.has(n)) return phiSumCache.get(n);

  let sum = (n * (n + 1n) / 2n) % mod;
  let s = 1n, a = n / s, e = n / a;
  while (s <= n) {
    s = e + 1n;
    if (s > n) break;
    a = n / s;
    e = n / a;

    sum -= clacPhiSum(a) * (e - s + 1n);
  }

  sum = ((sum % mod) + mod) % mod;
  phiSumCache.set(n, sum);

  return sum % mod;
}
