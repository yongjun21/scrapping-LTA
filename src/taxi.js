import PouchDB from 'pouchdb'
import {fetchData, parallelFetch} from './helpers'

const db = new PouchDB(
  'https://daburu.cloudant.com/lta-taxi-availability', {
    auth: {
      username: process.env.CLOUDANT_TAXI_KEY,
      password: process.env.CLOUDANT_TAXI_PASSWORD
    }
  }
)

const url = 'http://datamall2.mytransport.sg/ltaodataservice/TaxiAvailability'

fetchData(1000, parallelFetch.bind({url}))
  .then((result) => {
    const doc = {
      lat: result.map((location) => location.Latitude),
      long: result.map((location) => location.Longitude)
    }
    return db.put(doc, Date.now().toString())
  })
  .then(console.log)
  .catch(console.error)
