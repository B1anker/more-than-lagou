import mongodb from 'mongodb'
import config from './config'
const MongoClient = mongodb.MongoClient

class Operator {
  constructor () {
    this.url = config.url + config.database
    this.db = null
    this.collection = null
  }

  create () {

  }

  connect (table) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, db) => {
        if (!err) {
          console.log('连接成功')
          this.db = db
          this.collection = db.collection(table)
        }
        reject(err)
      })
    })
  }

  insert (params) {
    return new Promise((resolve, reject) => {
      this.collection.insert(params, (err, result) => {
        if (!err) {
          resolve(result)
        }
        reject(err)
      })
    })
  }

  find (query) {
    return new Promise((resolve, reject) => {
      this.collection.find(query).toArray((err, res) => {
        if (!err) {
          resolve(res)
        }
        reject(err)
      })
    })
  }
}