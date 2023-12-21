let phiSumCache = new Map();
/**
 * @param {bigint} n 
 * @param {bigint} mod 
 * @returns {bigint} 
 */
export default function clacPhiSum(n, mod, resetCache=false) {
  if (resetCache) phiSumCache = new Map();

  if (phiSumCache.has(n)) return phiSumCache.get(n);

  let sum = (n * (n + 1n) / 2n) % mod;
  let s = 1n, a = n / s, e = n / a;
  while (s <= n) {
    s = e + 1n;
    if (s > n) break;
    a = n / s;
    e = n / a;

    sum -= clacPhiSum(a, mod) * (e - s + 1n);
  }

  sum = ((sum % mod) + mod) % mod;
  phiSumCache.set(n, sum);

  return sum % mod;
}
