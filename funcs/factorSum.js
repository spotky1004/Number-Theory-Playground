import factorSumSum from "./factorSumSum.js";

// TODO: Use pollard rho
/**
 * @param {bigint} n 
 */
export default function factorSum(n) {
  return factorSumSum(n) - factorSumSum(n - 1n);
}
