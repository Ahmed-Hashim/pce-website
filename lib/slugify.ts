export function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD")                      // Remove accents
    .replace(/[\u0300-\u036f]/g, "")       // Remove accents leftovers
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")           // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, "");              // Remove leading/trailing -
}