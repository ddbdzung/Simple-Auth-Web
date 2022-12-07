export default function formatPhoneNumber(phoneNumber) {
  let result = phoneNumber + ''
  result = result.trim().split('')
  let str = ''
  result.forEach((char, idx) => {
    if (idx === 4 || idx === 7) {
      str += ` ${char}`
    } else {
      str += char
    }
  })

  return str
}
