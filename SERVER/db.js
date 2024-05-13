const Pool = require('pg').Pool
const pool = new Pool({
    user: "default",
    password: "vWhsa3ePR8wn",
    host: "ep-young-union-72839465-pooler.us-east-1.postgres.vercel-storage.com",
    port: "5432",
    database: "verceldb",
    ssl: true
})
module.exports = pool;