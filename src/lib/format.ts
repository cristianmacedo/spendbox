const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const currencyFormatterWithCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US");

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

const humanNumberMultipliers: Record<string, number> = {
  k: 1_000,
  thousand: 1_000,
  m: 1_000_000,
  mn: 1_000_000,
  million: 1_000_000,
  b: 1_000_000_000,
  bn: 1_000_000_000,
  billion: 1_000_000_000,
  t: 1_000_000_000_000,
  tn: 1_000_000_000_000,
  trillion: 1_000_000_000_000,
};

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatCurrencyWithCents(value: number): string {
  return currencyFormatterWithCents.format(value);
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatPercent(value: number): string {
  return percentFormatter.format(value);
}

export function formatCompact(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(1)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value}`;
}

export function parseHumanNumber(value: string): number | null {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/,/g, "")
    .replace(/\s+/g, " ");

  if (!normalized) {
    return null;
  }

  const match = normalized.match(
    /^(\d+(?:\.\d+)?)\s*(k|m|mn|b|bn|t|tn|thousand|million|billion|trillion)?$/
  );

  if (!match) {
    return null;
  }

  const numericValue = Number.parseFloat(match[1]);
  if (!Number.isFinite(numericValue)) {
    return null;
  }

  const suffix = match[2];
  const multiplier = suffix ? humanNumberMultipliers[suffix] : 1;

  return numericValue * multiplier;
}
