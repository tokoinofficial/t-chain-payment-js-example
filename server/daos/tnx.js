const sqlite3 = require('sqlite3')  
const Promise = require('bluebird')

class TnxDAO {  
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      }
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

  create(params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(`
      INSERT INTO transactions(tnx_hash, deposit_address, deposit_id, offchain, amount, fee, type, status, deposited_at)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, params, err =>  {
        if (err) {
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

  findAll(params = []) {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM transactions order by deposited_at desc", params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  findByHash(hash) {
    return this.dao.get(
      `SELECT * FROM transactions WHERE tnx_hash = ?`,
      [hash])
  }
}

module.exports = TnxDAO