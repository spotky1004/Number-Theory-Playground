import divAndPow from "./divAndPow.js";
import eularPhi from "./eularPhi.js";
import isPrime from "./isPrime.js";
import egcd from "./egcd.js";
import primeFactorization from "./primeFactorization.js";
import isPrimitiveRoot from "./isPrimitiveRoot.js";

/**
 * @param {bigint} n 
 * @param {bigint} g 
 */
export default function genLogSolver(n, g) {
  if (!isPrime(n)) throw "TBA: CRT";
  if (!isPrimitiveRoot(n, g)) throw `${g} isn't a primitive root of ${n}`;

  const phiN = eularPhi(n, primeFactorization(n));

  const sqrtPhiN = BigInt(Math.ceil(Math.sqrt(Number(phiN))));

  /** @type {bigint[]} */
  const pow1Map = new Map();
  let pow1CurVal = 1n;
  for (let i = 0n; i < sqrtPhiN; i++) {
    pow1Map.set(pow1CurVal, i);
    pow1CurVal = pow1CurVal * g % n;
  }
  /** @type {bigint[]} */
  const pow2 = Array(Math.ceil(Number(phiN) / Number(sqrtPhiN)));
  pow2[0] = 1n;
  pow2[1] = divAndPow(g, sqrtPhiN, n) % n;
  for (let i = 2; i < pow2.length; i++) {
    pow2[i] = pow2[i - 1] * pow2[1] % n;
  }
  
  /** @type {Map<bigint, bigint>} */
  const logCache = new Map();
  /**
   * Solves "g^? = x"
   * @param {bigint} x 
   */
  function log(x) {
    if (logCache.has(x)) return logCache.get(x);

    const inv = divAndPow(x, n - 2n, n);

    let t = -1n;
    for (let i = 0; i < pow2.length; i++) {
      t++;

      const l = inv * pow2[i] % n;
      if (!pow1Map.has(l)) continue;

      const result = t * sqrtPhiN - pow1Map.get(l);
      logCache.set(x, result);
      return result;
    }

    return -1n;
  }

  /** @type {Map<bigint, bigint>} */
  const sqrtCache = new Map();
  /**
   * Solves "?^r = x"
   * @param {bigint} x 
   * @param {bigint} r root
   */
  function sqrt(x, r = 2n) {
    const key = `${x},${r}`;
    if (sqrtCache.has(key)) sqrtCache.get(key);
    x %= n;

    if (x === 0n) return [0n];

    // "?^r = x (mod n)" -> "g^(ur) = g^v (mod n)" -> "g^(ur - v) = 1 (mod n)" -> "ur = v (mod phi(n))" -> "ru + phi(n)t = v"
    const v = log(x);
    const exGcdVal = egcd(r, phiN, v);
    if (exGcdVal === null) return -1n;
    let [u, , uShift] = exGcdVal;
    /** @type {Set<bigint>} */
    const ansSet = new Set();
    while (true) {
      const ans = divAndPow(g, u, n);
      if (ansSet.has(ans)) break;
      ansSet.add(ans);
      u = (u + uShift) % phiN;
    }
    
    const result = [...ansSet].sort((a, b) => Number(a - b));
    sqrtCache.set(key, result);
    return result;
  }

  return { log, sqrt };
}