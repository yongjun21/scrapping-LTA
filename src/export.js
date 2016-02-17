import PouchDB from 'pouchdb'
import fs from 'fs'

const db = new PouchDB(
  'https://daburu.cloudant.com/lta-travel-time', {
    auth: {
      username: process.env.CLOUDANT_KEY,
      password: process.env.CLOUDANT_PASSWORD
    }
  }
)

db.allDocs({include_docs: true})
  .then((docs) => docs.rows.map((row) => row.doc))
  .then((docs) => {
    fs.writeFileSync('data.json', JSON.stringify(docs))
  })
  .catch(console.error)
