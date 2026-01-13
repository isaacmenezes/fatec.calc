
import { useMemo } from 'react';
import { CalculatorInputs, CalculatorResults } from '../types';
import { MULTIPLIERS } from '../constants';

export const useCalculator = (inputs: CalculatorInputs): CalculatorResults => {
  return useMemo(() => {
    const { npc, enem, redacao, isAfro, isPublic } = inputs;

    // 1. Nota Objetiva FATEC (P)
    const p = (100 * npc) / 60;

    // 2. Nota ENEM em %
    const enemPercent = enem !== null ? enem / 10 : null;

    // 3. Nota Objetiva Final (N)
    let n = p;
    if (enemPercent !== null && enemPercent > p) {
      n = (4 * p + enemPercent) / 5;
    }

    // 4. Nota Final (NF)
    const nf = (8 * n + 2 * redacao) / 10;

    // 5. Multiplicador de Bônus
    let multiplier = MULTIPLIERS.none;
    if (isAfro && isPublic) multiplier = MULTIPLIERS.both;
    else if (isPublic) multiplier = MULTIPLIERS.public;
    else if (isAfro) multiplier = MULTIPLIERS.afro;

    // 6. Nota Final do Candidato (NFC)
    const nfc = nf * multiplier;

    return {
      p,
      enemPercent,
      n,
      nf,
      nfc,
      multiplier
    };
  }, [inputs]);
};
