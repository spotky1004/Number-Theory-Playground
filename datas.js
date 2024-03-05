import * as nt from "./funcs/bundle.js";
import * as logger from "./loggers.js";

/**
 * @typedef {"ko" | "en"} Languages 
 */
/**
 * @typedef StringsData 
 * @prop {string} name 
 * @prop {string} description 
 */
/**
 * @typedef {{[K in Languages]: StringsData}} StringLanguages 
 */
/**
 * @typedef InputVarData 
 * @prop {StringLanguages} strings 
 * @prop {number | bigint} min 
 * @prop {number | bigint} max 
 * @prop {boolean?} isPrime 
 */
/**
 * @typedef CalcFuncOutput 
 * @prop {string} out 
 */
/**
 * @typedef Data 
 * @prop {StringLanguages} strings 
 * @prop {string} icon 
 * @prop {string} color 
 * @prop {InputVarData[]} inputVars 
 * @prop {(...params: bigint[]) => CalcFuncOutput} calcFunc 
 */


const COL = {
  BASIC: "#1da7bf",
  ADVANCED: "#f0ab51",
  EXPERT: "#f06767"
};
export const NUMS = {
  ZERO: 0n,
  ONE: 1n,
  MAX_MEMORY: 10n ** 8n,
  MAX_ITERABLE: 10n ** 10n,
  MAX_FACTORIZATIONABLE: 10n ** 50n,
  INF: 10n ** 10n ** 5n,
  MINUS_INF: -(10n ** 10n ** 5n)
};

/**
 * @typedef {(min: number | bigint, max: number | bigint) => InputVarData} VarsFunc
 */
const VARS = {
  /** @type {VarsFunc} */
  A: (min, max) => ({
    strings: {
      en: {
        name: "a",
        description: "Variable a"
      },
      ko: {
        name: "a",
        description: "변수 a"
      }
    },
    min,
    max
  }),
  /** @type {VarsFunc} */
  B: (min, max) => ({
    strings: {
      en: {
        name: "b",
        description: "Variable b"
      },
      ko: {
        name: "b",
        description: "변수 b"
      }
    },
    min,
    max
  }),
  /** @type {VarsFunc} */
  N: (min, max) => ({
    strings: {
      en: {
        name: "n",
        description: "Variable n"
      },
      ko: {
        name: "n",
        description: "변수 n"
      }
    },
    min,
    max
  }),
  /** @type {VarsFunc} */
  R: (min, max) => ({
    strings: {
      en: {
        name: "r",
        description: "Variable r"
      },
      ko: {
        name: "r",
        description: "변수 r"
      }
    },
    min,
    max
  }),
  /** @type {VarsFunc} */
  P: (min, max) => ({
    strings: {
      en: {
        name: "p",
        description: "Mod"
      },
      ko: {
        name: "p",
        description: "나머지"
      }
    },
    isPrime: true,
    min,
    max
  }),
  /** @type {VarsFunc} */
  M: (min, max) => ({
    strings: {
      en: {
        name: "m",
        description: "Mod"
      },
      ko: {
        name: "m",
        description: "나머지"
      }
    },
    min,
    max
  }),
}

/** @type {Data[]} */
const datas = [
  // n mod m
  {
    strings: {
      en: {
        name: "Modular",
        description: "\\(n\\ mod\\ m\\)\n\nCalculates the remainder when \\(n\\) is divided by \\(m\\)."
      },
      ko: {
        name: "나머지",
        description: "\\(n\\ mod\\ m\\)\n\n\\(n\\)을 \\(m\\)로 나눴을 떄의 나머지를 구해요."
      }
    },
    icon: "percent",
    color: COL.BASIC,
    inputVars: [
      VARS.N(NUMS.MINUS_INF, NUMS.INF),
      VARS.M(NUMS.ZERO, NUMS.INF)
    ],
    calcFunc: (n, mod) => {
      const result = nt.mod(n, mod);
      return {
        out: `${result}`
      };
    }
  },
  // gcd(a, b)
  {
    strings: {
      en: {
        name: "Greatest Common Divisor",
        description: "\\(gcd(a,\\ b)\\)\n\nCalculates the gcd(Greatest Common Divisor) of two numbers."
      },
      ko: {
        name: "최대공약수",
        description: "\\(gcd(a,\\ b)\\)\n\n두 수의 최대공약수를 계산해요."
      }
    },
    icon: "view_carousel",
    color: COL.BASIC,
    inputVars: [
      VARS.A(NUMS.MINUS_INF, NUMS.INF),
      VARS.B(NUMS.MINUS_INF, NUMS.INF)
    ],
    calcFunc: (a, b) => {
      const result = nt.gcd(a, b);
      return {
        out: `${result}`
      };
    }
  },
  // lcm(a, b)
  {
    strings: {
      en: {
        name: "Lowest Common Multiple",
        description: "\\(lcm(a,\\ b)\\)\n\nCalculates the lcm(Lowest Common Multiple) of two numbers."
      },
      ko: {
        name: "최소공배수",
        description: "\\(lcm(a,\\ b)\\)\n\n두 수의 최소공배수를 계산해요."
      }
    },
    icon: "flex_no_wrap",
    color: COL.BASIC,
    inputVars: [
      VARS.A(NUMS.MINUS_INF, NUMS.INF),
      VARS.B(NUMS.MINUS_INF, NUMS.INF)
    ],
    calcFunc: (a, b) => {
      const result = nt.lcm(a, b);
      return {
        out: `${result}`
      };
    }
  },
  // Divisors
  {
    strings: {
      en: {
        name: "Divisors",
        description: "Calculate all divisors of a number. Additionally, calculate factors of each divisors."
      },
      ko: {
        name: "약수",
        description: "어떤 수의 모든 약수를 구해요. 그리고, 그 약수의 소인수분해를 계산해요."
      }
    },
    icon: "heap_snapshot_thumbnail",
    color: COL.BASIC,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE)
    ],
    calcFunc: (n) => {
      const result = nt.calcDivisors(nt.primeFactorization(n));
      console.log(result);

      let out = "";
      out += `${result.map(v => v[0]).join(", ")}\n\n`;
      for (const [divisor, divisorFactors] of result) {
        let line = "";
        line += `\\(${divisor}\\ =\\ `;

        if (divisorFactors.length === 0) {
          line += " 1";
        } else {
          let isFirstFactor = true;
          for (const [factor, pow] of divisorFactors) {
            if (!isFirstFactor) line += "\\ \\times\\ ";
            line += factor;
            if (pow >= 2n) line += `^{${pow}}`;
            isFirstFactor = false;
            console.log(factor, pow, line);
          }
        }

        line.trim();
        line += "\\)\n";

        out += line;
      }

      return {
        out: out
      };
    }
  },
  // Generate Primes
  {
    strings: {
      en: {
        name: "Generate Primes",
        description: "Find all primes in range \\(1 ~ n\\)"
      },
      ko: {
        name: "소수 생성",
        description: "(\\(1\\) ~ \\(n\\)) 구간의 모든 소수를 구해줘요"
      }
    },
    icon: "grid_off",
    color: COL.BASIC,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_ITERABLE)
    ],
    calcFunc: (n) => {
      const result = nt.genPrimes(Number(n));
      return {
        out: `Count: ${result.length}\n${result.join(", ")}`
      };
    }
  },
  // Power by Divide and Conquer
  {
    strings: {
      en: {
        name: "Power",
        description: "Calculates \\(n^a\\ (mod\\ m)\\)"
      },
      ko: {
        name: "거듭제곱",
        description: "\\(n^a\\ (mod\\ m)\\)를 계산해줘요"
      }
    },
    icon: "stat_1",
    color: COL.BASIC,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.INF),
      VARS.A(NUMS.ZERO, NUMS.INF),
      VARS.M(NUMS.ZERO, NUMS.INF),
    ],
    calcFunc: (n, a, m) => {
      const result = nt.divAndPow(n, a, m);
      return {
        out: `${result}`
      };
    }
  },
  // Modular Inverse
  {
    strings: {
      en: {
        name: "Modular Inverse",
        description: "\\(1 / n \\equiv x (mod m)\\)\n" +
          "\n" +
          "Calculate \\(x\\) when \\(1 / n \\equiv x (mod m)\\)\n" +
          "\\(x \\equiv n^{m - 2} (mod m)\\) (when \\(m\\) is prime)\n" +
          "\\(x \\equiv n^{\\phi(m) - 1} (mod m)\\) (\\(\\phi(x)\\) is Euler's Totient Function)"
      },
      ko: {
        name: "모듈로 역원",
        description: "\\(1 / n \\equiv x (mod m)\\)\n" +
          "\n" +
          "\\(1 / n \\equiv x (mod m)\\)에서 \\(x\\)를 구해줘요\n" +
          "\\(x \\equiv n^{m - 2} (mod m)\\) (\\(m\\)은 소수)\n" +
          "\\(x \\equiv n^{\\phi(m) - 1} (mod m)\\) (\\(\\phi(x)\\) 는 오일러 피 함수)"
      }
    },
    icon: "invert_colors",
    color: COL.BASIC,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.INF),
      VARS.M(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE),
    ],
    calcFunc: (n, m) => {
      const result = nt.modInv(n, m);
      return {
        out: `${result}`
      };
    }
  },
  // Generate Factorial Mod
  {
    strings: {
      en: {
        name: "Generate Factorial Modulos",
        description: "Generates Factorial Modulos in range (\\(1\\) ~ \\(n\\))."
      },
      ko: {
        name: "팩토리얼 생성",
        description: "(\\(1\\) ~ \\(n\\)) 구간의 팩토리얼을 \\(m\\)으로 나눈 나머지를 구해줘요."
      }
    },
    icon: "heap_snapshot_large",
    color: COL.BASIC,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_ITERABLE),
      VARS.M(NUMS.ZERO, NUMS.INF),
    ],
    calcFunc: (n, m) => {
      const result = nt.genFactMod(Number(n), Number(m));
      return {
        out: `${result.join(", ")}`
      };
    }
  },
  // Combination
  // TODO: CRT
  {
    strings: {
      en: {
        name: "Combination",
        description: "\\({n \\choose r}\\ (mod\\ p)\\)\n\nCalculates combination."
      },
      ko: {
        name: "조합",
        description: "\\({n \\choose r}\\ (mod\\ p)\\)\n\n조합을 계산해줘요."
      }
    },
    icon: "rule",
    color: COL.BASIC,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.INF),
      VARS.R(NUMS.ZERO, NUMS.INF),
      VARS.P(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE),
    ],
    calcFunc: (n, r, p) => {
      if (p < NUMS.MAX_MEMORY) {
        const result = nt.combinationLucas(p)(n, r);
        return {
          out: `${result}`
        };
      } else {
        const factorials = nt.genFactMod(Math.max(Number(n), Number(r)), p).map(BigInt);
        const result = nt.combination(n, r, p, factorials);
        return {
          out: `${result}`
        };
      }
    }
  },
  // Generate Modular Inverse
  {
    strings: {
      en: {
        name: "Generate Modulo Inverse",
        description: "Generates Modulo Inverse in range (\\(1\\) ~ \\(n\\))."
      },
      ko: {
        name: "모듈로 역원 생성",
        description: "(\\(1\\) ~ \\(n\\)) 구간의 모듈로 역원을 구해줘요."
      }
    },
    icon: "humidity_percentage",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_ITERABLE),
      VARS.P(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE),
    ],
    calcFunc: (n, p) => {
      const result = nt.genModInv(Number(n), p);
      result.shift();

      return {
        out: `${result.join(", ")}`
      };
    }
  },
  // Generate Factorial Modular Inverse
  {
    strings: {
      en: {
        name: "Gen Fact Modulo Inverse",
        description: "Generates Factorial Modulo Inverse in range (\\(1\\) ~ \\(n\\))."
      },
      ko: {
        name: "팩토리얼 모듈로 역원 생성",
        description: "(\\(1\\) ~ \\(n\\)) 구간의 팩토리얼 모듈로 역원을 구해줘요."
      }
    },
    icon: "heap_snapshot_multiple",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_ITERABLE),
      VARS.P(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE),
    ],
    calcFunc: (n, p) => {
      const inv = nt.genModInv(Number(n), p);
      const result = nt.genFactModInv(Number(n), inv, p);
      result.shift();

      return {
        out: `${result.join(", ")}`
      };
    }
  },
  // calcFib
  {
    strings: {
      en: {
        name: "Fibonacci",
        description: "Calculate \\(n\\)th fibonacci number."
      },
      ko: {
        name: "피보나치",
        description: "\\(n\\)번째 피보나치 수를 계산해요."
      }
    },
    icon: "cruelty_free",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.INF),
      VARS.M(NUMS.ZERO, NUMS.INF)
    ],
    calcFunc: (n, m) => {
      const result = nt.calcFib(n, m);
      return {
        out: `${result}`
      };
    }
  },
  // isPrime
  {
    strings: {
      en: {
        name: "Prime Check",
        description: "Check \\(n\\) is prime."
      },
      ko: {
        name: "소수 판정",
        description: "\\(n\\)이 소수인지 확인해줘요."
      }
    },
    icon: "done",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE),
    ],
    calcFunc: (n) => {
      const result = nt.isPrime(n);

      return {
        out: `${result}`
      };
    }
  },
  // primeFactorization
  {
    strings: {
      en: {
        name: "Prime Factorization",
        description: "Prime factorize \\(n\\)."
      },
      ko: {
        name: "소인수분해",
        description: "\\(n\\)을 소인수분해 해줘요."
      }
    },
    icon: "bottom_right_click",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE)
    ],
    calcFunc: (n) => {
      const result = nt.primeFactorization(n);
      return {
        out: `Count: ${result.length}\n${result.join(", ")}`
      };
    }
  },
  // eularPhi
  {
    strings: {
      en: {
        name: "Euler's Totient Function",
        description: "\\(\\phi(a)\\)\n\nCalculates Euler's totient function."
      },
      ko: {
        name: "오일러 피",
        description: "\\(\\phi(a)\\)\n\n오일러 피 함수를 계산해요."
      }
    },
    icon: "move_selection_left",
    color: COL.ADVANCED,
    inputVars: [
      VARS.A(NUMS.ONE, NUMS.MAX_FACTORIZATIONABLE)
    ],
    calcFunc: (n) => {
      const result = nt.eularPhi(n, nt.primeFactorization(n));
      return {
        out: `${result}`
      };
    }
  },
  // Gen eularPhi
  {
    strings: {
      en: {
        name: "Generate Euler's Totient",
        description: "Calculates Euler's totient function in range \\(1 ~ n\\)"
      },
      ko: {
        name: "오일러 피 생성",
        description: "(\\(1\\) ~ \\(n\\)) 구간의 모든 오일러 피 함수의 값을 구해줘요"
      }
    },
    icon: "text_select_move_forward_word",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ONE, NUMS.MAX_ITERABLE)
    ],
    calcFunc: (n) => {
      const result = nt.genPhi(Number(n));
      result.shift();

      return {
        out: `${result.join(", ")}`
      };
    }
  },
  // exGcd
  {
    strings: {
      en: {
        name: "Extended Euclidean",
        description: "\\(a(x\\ +\\ tx\\prime)\\ +\\ b(y\\ +\\ ty\\prime)\\ =\\ n\\) \\((t\\in\\mathbb{Z})\\)\n\nCalculate \\(x\\), \\(x\\prime\\), \\(y\\) and \\(y\\prime\\)"
      },
      ko: {
        name: "확장 유클리드",
        description: "\\(a(x\\ +\\ tx\\prime)\\ +\\ b(y\\ +\\ ty\\prime)\\ =\\ n\\) \\((t\\in\\mathbb{Z})\\)\n\n위 식에서 \\(x\\), \\(x\\prime\\), \\(y\\), \\(y\\prime\\)를 계산해줘요."
      }
    },
    icon: "pivot_table_chart",
    color: COL.ADVANCED,
    inputVars: [
      VARS.A(NUMS.ZERO, NUMS.INF),
      VARS.B(NUMS.ZERO, NUMS.INF),
      VARS.N(NUMS.ZERO, NUMS.INF),
    ],
    calcFunc: (a, b, n) => {
      const result = nt.exGcd(a, b, n);
      let out;
      if (result === null) out = "No solution";
      else out = `x = ${result[0]}, x' = ${result[2]}, y = ${result[1]}, y' = ${-result[3]}`;
      return {
        out
      };
    }
  },
  {
    strings: {
      en: {
        name: "Sum of Harmonic Series",
        description: "\\(\\sum_{k=1}^{\\infty}\\lfloor\\frac{n}{k}\\rfloor\\)",
      },
      ko: {
        name: "조화수열의 합",
        description: "\\(\\sum_{k=1}^{\\infty}\\lfloor\\frac{n}{k}\\rfloor\\)"
      }
    },
    icon: "stairs",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE)
    ],
    calcFunc: (n) => {
      return {
        out: nt.harmonicSum(n).toString()
      };
    }
  },
  {
    strings: {
      en: {
        name: "Sum of Sum of Factors",
        description: "Calculates (sum of factors of \\(1\\)) + (sum of factors of \\(2\\)) + \\(\\ldots\\) + (sum of factors of \\(n\\))"
      },
      ko: {
        name: "약수의 합의 합",
        description: "(\\(1\\)의 약수의 합) + (\\(2\\)의 약수의 합) + \\(\\ldots\\) + (\\(n\\)의 약수의 합)을 계산해요"
      }
    },
    icon: "widgets",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE)
    ],
    calcFunc: (n) => {
      return {
        out: nt.factorSumSum(n).toString()
      }
    }
  },
  // calcOrder
  {
    strings: {
      en: {
        name: "Order",
        description: "\\(a^k\\ \\equiv\\ 1\\ (mod\\ m)\\)\n\nFind minimum \\(k\\)."
      },
      ko: {
        name: "위수",
        description: "\\(a^k\\ \\equiv\\ 1\\ (mod\\ m)\\)\n\n위 식에서 가장 작은 \\(k\\)를 찾아줘요."
      }
    },
    icon: "looks_one",
    color: COL.ADVANCED,
    inputVars: [
      VARS.A(NUMS.ZERO, NUMS.INF),
      VARS.M(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE),
    ],
    calcFunc: (a, m) => {
      const result = nt.calcOrder(a, m, nt.primeFactorization(nt.eularPhi(m, nt.primeFactorization(m))));
      return {
        out: `${result}`
      };
    }
  },
  // findPrimitiveRoot
  {
    strings: {
      en: {
        name: "Primitive Root",
        description: "Find \\(n\\) Primitive Root for \\(m\\)."
      },
      ko: {
        name: "원시근",
        description: "\\(m\\)에 대한 가장 작은 원시근 \\(n\\)개를 찾아줘요."
      }
    },
    icon: "select_all",
    color: COL.ADVANCED,
    inputVars: [
      VARS.N(NUMS.ONE, NUMS.MAX_ITERABLE),
      VARS.M(NUMS.ONE, NUMS.MAX_FACTORIZATIONABLE),
    ],
    calcFunc: (n, m) => {
      const phiM = nt.eularPhi(m, nt.primeFactorization(m));
      const result = nt.findPrimitiveRoot(m, phiM, Number(n));
      console.log(m, phiM, result);
      return {
        out: `${result.length > 0 ? result.join(", ") : "No solution"}`
      };
    }
  },
  // Discrete Logarithm
  // TODO: CRT
  {
    strings: {
      en: {
        name: "Discrete Logarithm",
        description: "\\(g^x\\ \\equiv\\ a\\ (mod\\ m)\\)\n\nFind \\(g\\) and \\(x\\) in the expression."
      },
      ko: {
        name: "이산 로그",
        description: "\\(g^x\\ \\equiv\\ a\\ (mod\\ m)\\)\n\n위의 식에서 \\(g\\) 와 \\(x\\)의 값을 찾아줘요."
      }
    },
    icon: "stat_minus_1",
    color: COL.EXPERT,
    inputVars: [
      VARS.A(NUMS.ZERO, NUMS.MAX_ITERABLE),
      {
        ...VARS.M(NUMS.ZERO, NUMS.MAX_ITERABLE),
        isPrime: true
      },
    ],
    calcFunc: (a, m) => {
      const { g, log } = nt.discreteLogarithm(m);
      const result = log(a);

      return {
        out: `g = ${g}, x = ${result}`
      };
    }
  },
  // Discrete Sqrt
  // TODO: CRT
  {
    strings: {
      en: {
        name: "Discrete Sqrt",
        description: "\\(x^a\\ \\equiv\\ b\\ (mod\\ m)\\)\n\nFind \\(x\\) in the expression.\nIf there's no solution, returns -1."
      },
      ko: {
        name: "이산 제곱근",
        description: "\\(x^a\\ \\equiv\\ b\\ (mod\\ m)\\)\n\n위 식에서 \\(x\\)의 값을 찾아줘요.\n해가 없다면 -1이 출력돼요."
      }
    },
    icon: "stat_minus_2",
    color: COL.EXPERT,
    inputVars: [
      VARS.A(NUMS.ZERO, NUMS.MAX_ITERABLE),
      VARS.B(NUMS.ZERO, NUMS.MAX_ITERABLE),
      {
        ...VARS.M(NUMS.ZERO, NUMS.MAX_ITERABLE),
        isPrime: true
      },
    ],
    calcFunc: (a, b, m) => {
      const { sqrt } = nt.discreteLogarithm(m);
      const result = sqrt(b, a);

      return {
        out: `${result}`
      };
    }
  },
  // Euler Sum
  {
    strings: {
      en: {
        name: "Sum of Euler's Totient",
        description: "\\(\\sum_{k=1}^{n}\\phi(k)\\ (mod\\ m)\\)"
      },
      ko: {
        name: "오일러 피 합",
        description: "\\(\\sum_{k=1}^{n}\\phi(k)\\ (mod\\ m)\\)"
      }
    },
    icon: "functions",
    color: COL.EXPERT,
    inputVars: [
      VARS.N(NUMS.ZERO, NUMS.MAX_FACTORIZATIONABLE),
      VARS.M(NUMS.ZERO, NUMS.INF),
    ],
    calcFunc: (n, m) => {
      const result = nt.calcPhiSum(n, m, true);

      return {
        out: `${result}`
      };
    }
  },
];

export default datas;
