const stringToArray = str => str.split('')

const hideMail = email => {
  const splits = email.split('@')

  const first = stringToArray(splits[0]).map((item, idx) => {
    if (idx === 0 || idx === splits[0].length - 1) {
      return item
    }

    return '*'
  })

  return `${first.join('')}@${splits[1]}`
}

export default hideMail
