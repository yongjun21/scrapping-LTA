import PouchDB from 'pouchdb'
import fs from 'fs'

const db = new PouchDB(
  'https://daburu.cloudant.com/lta-travel-time', {
    auth: {
      username: process.env.CLOUDANT_TRAVEL_KEY,
      password: process.env.CLOUDANT_TRAVEL_PASSWORD
    }
  }
)

db.allDocs({include_docs: true})
  .then((docs) => docs.rows.map((row) => row.doc))
  .then((docs) => {
    fs.writeFileSync('R/travel.json', JSON.stringify(docs))
  })
  .catch(console.error)
