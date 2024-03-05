import genFactMod from "./genFactMod.js";
import combination from "./combination.js";

/**
 * @param {bigint} mod 
*/
export default function genCombinationCalculator(mod) {
  const factMod = genFactMod(Number(mod), Number(mod)).map(BigInt);

  /**
   * @param {bigint} n 
   * @param {bigint} r 
   */
  return function (n, r) {
    let ans = 1n;
    let np = n, rp = r;
    while (np > 0n && rp > 0n) {
      const ni = np % mod, ri = rp % mod;
      np /= mod;
      rp /= mod;
      ans *= combination(ni, ri, mod, factMod);
    }
    return ans % mod;
  }
}
