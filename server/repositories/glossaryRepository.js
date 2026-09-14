const db = require('./database');

const execute = (sql, params) => db.execute(sql, params);
const query = (sql, params) => db.query(sql, params);

module.exports = { execute, query };
