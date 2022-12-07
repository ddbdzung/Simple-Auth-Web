export default function formatCurrencyVND(vnd) {
  return vnd.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
