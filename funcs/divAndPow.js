/**
 * @param {bigint} a 
 * @param {bigint} b 
 * @param {bigint} mod
*/
export default function divAndPow(a, b, mod) {
  if (b === 0n) return 1n;

  let out = 1n;
  let curMul = a;
  const loopCount = BigInt(Math.ceil(Math.log2(Number(b))) + 1);
  for (let i = 0n; i < loopCount; i++) {
    if (b & 1n << i) {
      out = out*curMul % mod;
    }
    curMul = curMul**2n % mod;
  }
  return out;
}
