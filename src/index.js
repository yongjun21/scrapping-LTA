import PouchDB from 'pouchdb'
import fetch from 'node-fetch'

const db = new PouchDB(
  'https://daburu.cloudant.com/lta-travel-time', {
    auth: {
      username: process.env.CLOUDANT_KEY,
      password: process.env.CLOUDANT_PASSWORD
    }
  }
)

const url = 'http://datamall.mytransport.sg/ltaodataservice.svc/TravelTimeSet'
const options = {
  headers: {
    AccountKey: process.env.DATAMALL_ACCOUNT_KEY,
    UniqueUserId: process.env.DATAMALL_UNIQUE_USER_ID,
    accept: 'application/json'
  }
}

function recursiveFetch (skip, result = []) {
  return fetch(url + '?$skip=' + skip, options)
    .then((response) => response.json())
    .then((json) => json.d)
    .then((arr) => {
      result = result.concat(arr)
      if (arr.length < 50) return result
      return recursiveFetch(skip + 50, result)
    })
}

recursiveFetch(0).then((result) => {
  result = result.map((record) => {
    return {
      _id: record.TravelTimeID.toString(),
      Name: record.Name,
      Direction: record.Direction,
      FarEndPoint: record.FarEndPoint,
      StartPoint: record.StartPoint,
      EndPoint: record.EndPoint,
      EstimatedTime: record.EstimatedTime,
      CreateDate: new Date(+record.CreateDate.slice(6, 19)) // '/Date(1455697556610)/'
    }
  })
  db.bulkDocs(result).then(console.log)
})
