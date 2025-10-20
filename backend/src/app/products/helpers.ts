export function truncateNumber(valor: number, casas: number): number {
  const fator = Math.pow(10, casas)
  return Math.trunc(valor * fator) / fator
}
