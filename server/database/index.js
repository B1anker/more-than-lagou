import DB from './operator'

const db = new DB()

export default (async () => {
  return await db.connect('job')
})()
