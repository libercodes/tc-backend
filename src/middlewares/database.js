import util from 'util'
import mysql, { ConnectionConfig, Connection, Query, QueryFunction  } from 'mysql'

const config = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}


const pool = mysql.createPool(config)

pool.getConnection((err, connection) => {
    if(err){
        err.code === 'PROTOCOL_CONNECTION_LOST' && console.error('Database connection was closed.')
        err.code === 'ER_CON_COUNT_ERROR' && console.error('Database has too many connections.')
        err.code === 'ECONNREFUSED' && console.error('Database connection was refused.')
    }

   /*  if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    } */
  
    connection && connection.release()
    //if (connection) connection.release()
    return
})

pool.query = util.promisify(pool.query)

export default pool