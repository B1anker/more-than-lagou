function parseJSON (json) {
  let query = ''
  Object.keys(json).forEach((item, index) => {
    query = query + `${item}=${json[item]}` + ((index === Object.keys(json).length - 1) ? '' : '&')
  })
  return query
}

export {
  parseJSON
}