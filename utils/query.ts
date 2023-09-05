import pool from './db';

const executeQuery = (sql: string, params: any[] = []): Promise<any> => {
    return new Promise((resolve, reject) => {
        console.log(`query.ts: About to execute query: ${sql}`);
        console.log(`query.ts: With parameters: ${JSON.stringify(params)}`);

        pool.query(sql, params, (error, results) => {
            if (error) {
                console.error(`query.ts: Query execution failed: ${JSON.stringify(error)}`);
                reject(error);
                return;
            }
            
            console.log(`query.ts: Query executed successfully. Results: ${JSON.stringify(results)}`);
            resolve(results);
        });
    });
};

export default executeQuery;
