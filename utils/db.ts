import mysql from 'mysql';

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_database',
});

// Export the pool
export default pool;
