/**
 * @desc Remove acentos e transforma string em lowercase
 * @example "João" -> "joao"
 */
export function normalizeText(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
