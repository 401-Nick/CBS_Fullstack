import pool from './db';

const executeQuery = (sql: string, params: any[] = []): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(results);
        });
    });
};

export default executeQuery;