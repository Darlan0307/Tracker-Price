export function formatPrice(amountInCents: number, currency: string): string {
  const amount = amountInCents / 100;

  return new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
