import PouchDB from 'pouchdb'
import {fetchData, serialFetch} from './helpers'

const db = new PouchDB(
  'https://daburu.cloudant.com/lta-travel-time', {
    auth: {
      username: process.env.CLOUDANT_TRAVEL_KEY,
      password: process.env.CLOUDANT_TRAVEL_PASSWORD
    }
  }
)

const url = 'http://datamall.mytransport.sg/ltaodataservice.svc/TravelTimeSet'

fetchData(50, serialFetch.bind({url}))
  .then((result) => {
    result = result.map((record) => {
      return {
        _id: record.TravelTimeID.toString(),
        Name: record.Name,
        Direction: record.Direction,
        FarEndPoint: record.FarEndPoint,
        StartPoint: record.StartPoint,
        EndPoint: record.EndPoint,
        EstimatedTime: record.EstimatedTime,
        CreateDate: +record.CreateDate.slice(6, 19) // '/Date(1455697556610)/'
      }
    })
    return db.bulkDocs(result)
  })
  .then(console.log)
  .catch(console.error)
