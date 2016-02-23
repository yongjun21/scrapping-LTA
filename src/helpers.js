import fetch from 'node-fetch'

const options = {
  headers: {
    AccountKey: process.env.DATAMALL_ACCOUNT_KEY,
    UniqueUserId: process.env.DATAMALL_UNIQUE_USER_ID,
    accept: 'application/json'
  }
}

export function fetchData (offset, func) {
  function recursiveFetch (skip, result = []) {
    return func(skip)
      .then((arr) => {
        result = result.concat(arr)
        if (arr.length < offset) return result
        return recursiveFetch(skip + offset, result)
      })
      .catch((err) => { throw err })
  }

  return recursiveFetch(0)
}

export function serialFetch (skip) {
  return fetch(this.url + '?$skip=' + skip, options)
    .then((response) => response.json())
    .then((json) => json.d)
}

export function parallelFetch (skip) {
  const seq = Array(20).fill(50).map((v, i) => skip + i * v)
  return Promise.all(seq.map((point) => {
    return fetch(this.url + '?$skip=' + point, options)
      .then((response) => response.json())
      .then((json) => json.value)
  })).then((result) => result.reduce((a, v) => a.concat(v), []))
}
