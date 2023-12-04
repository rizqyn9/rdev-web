export function dateFormatEn(date: Date, type: "full" | "short" = "short") {
  const isFull = type == "full"

  return new Intl.DateTimeFormat("en-EN", {
    year: isFull ? "numeric" : "2-digit",
    month: isFull ? "long" : "short",
    day: "numeric",
  }).format(date)
}
