import gcd from "./gcd.js";
import isPrime from "./isPrime.js";
import genPrimes from "./genPrimes.js";

const primes = genPrimes(10000000).map(BigInt);

/**
 * @param {bigint} n 
 * @param {bigint} c 
 * @returns {bigint[]} 
 */
function pollardRho(n, c = 1n) {
  for (const p of primes) if (n % p === 0n) return p;

  if (n === 1n || isPrime(n)) return n;
  if (n % 2n === 0n) return 2n;

  let a = 2n;
  let b = a;
  while (true) {
    a = (a * a + c) % n;
    b = (b * b + c) % n;
    b = (b * b + c) % n;
    if (a === b) return pollardRho(n, c + 1n);
    let dif = a - b;
    if (dif < 0n) dif = -dif;
    if (n % dif !== 0n) continue;
    return gcd(n, dif);
  }
}

/**
 * @param {bigint} x 
 */
export default function primeFactorization(x) {
  if (x <= 3n) return [x];
  const toFactorization = [x];
  /** @type {bigint[]} */
  const factors = [];
  for (const n of toFactorization) {
    if (isPrime(n)) {
      factors.push(n);
      continue;
    }
    const p = pollardRho(n);
    const q = n / p;
    if (isPrime(p)) factors.push(p);
    else if (p !== 1n) toFactorization.push(p);
    if (isPrime(q)) factors.push(q);
    else if (q !== 1n) toFactorization.push(q);
  }
  return factors.sort((a, b) => Number(a - b));
}