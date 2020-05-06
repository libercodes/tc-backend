import util from 'util'
import mysql,{ Pool, PoolConfig } from 'mysql'
import dotenv from 'dotenv'
dotenv.config()


const config:PoolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

interface AsyncPool extends Pool{
  queryAsync?: (arg1: string) => Promise<unknown>
}
const pool: AsyncPool = mysql.createPool(config)
/* pool.getConnection((err, connection) => {
    if(err){
        err.code === 'PROTOCOL_CONNECTION_LOST' && console.error('Database connection was closed.')
        err.code === 'ER_CON_COUNT_ERROR' && console.error('Database has too many connections.')
        err.code === 'ECONNREFUSED' && console.error('Database connection was refused.')
        err.code === 'ER_NOT_SUPPORTED_AUTH_MODE' && console.error('Client does not support authentication protocol')
    }
    connection && connection.release()
    return
})
 */
//pool.queryAsync = util.promisify(pool.query)

export default pool
