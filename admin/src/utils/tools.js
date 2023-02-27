export default function dolar(value) {
    const formatter = value.toLocaleString("en", {
      style: "currency",
      currency: "USD"
    })
    return formatter
} 