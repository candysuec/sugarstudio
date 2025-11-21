export function cn(...classes: (string | null | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
