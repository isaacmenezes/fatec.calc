
export type ViewState = 'landing' | 'simulator' | 'about';

export interface CalculatorInputs {
  npc: number; // Nota Prova Comum (0-60)
  enem: number | null; // Nota ENEM (0-1000)
  redacao: number; // Nota Redação (0-100)
  isAfro: boolean;
  isPublic: boolean;
}

export interface CalculatorResults {
  p: number; // Nota Objetiva FATEC
  enemPercent: number | null; // ENEM em porcentagem
  n: number; // Nota Objetiva Final
  nf: number; // Nota Final
  nfc: number; // Nota Final do Candidato (com bônus)
  multiplier: number;
}
