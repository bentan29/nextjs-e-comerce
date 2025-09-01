export function slugify(str: string): string {
    return str
      .toLowerCase()
      .normalize("NFD") // elimina acentos y tildes
      .replace(/[\u0300-\u036f]/g, "") // remueve diacríticos restantes
      .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres especiales
      .replace(/\s+/g, "-") // reemplaza espacios por guiones
      .replace(/-+/g, "-") // elimina guiones duplicados
      .trim();
}