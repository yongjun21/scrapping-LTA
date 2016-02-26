import PouchDB from 'pouchdb'
import fs from 'fs'

const db = new PouchDB(
  'https://daburu.cloudant.com/lta-taxi-availability', {
    auth: {
      username: process.env.CLOUDANT_TAXI_KEY,
      password: process.env.CLOUDANT_TAXI_PASSWORD
    }
  }
)

db.allDocs({include_docs: true})
  .then((docs) => docs.rows.map((row) => row.doc))
  .then((docs) => {
    let timestamp = []
    let lat = []
    let long = []
    docs.forEach((doc) => {
      lat = lat.concat(doc.lat)
      long = long.concat(doc.long)
      timestamp = timestamp.concat(Array(doc.lat.length).fill(+doc._id))
    })
    fs.writeFileSync('R/taxi.json', JSON.stringify({timestamp, lat, long}))
  })
  .catch(console.error)
