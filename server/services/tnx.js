class TnxService {
    constructor(tnxDao) {
        this.tnxDao = tnxDao;
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tnx_hash TEXT,
                deposit_address TEXT,
                deposit_id TEXT,
                offchain TEXT,
                amount TEXT,
                fee TEXT,
                type TEXT,
                status TEXT,
                deposited_at INT
            )
        `
        return this.tnxDao.run(sql)
    }

    addNewTnx(params=[]) {
        return this.tnxDao.create(params);
    }

    getAll() {
        return this.tnxDao.findAll()
    }
}
module.exports = TnxService;