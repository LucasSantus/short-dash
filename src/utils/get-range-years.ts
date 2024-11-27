export function getYearsPerRange(years = 30): number[] {
  const today = new Date();

  const yearsPerRange = Array.from({ length: years + 1 }, (_, i) => today.getFullYear() - years / 2 + i);

  return yearsPerRange;
}
