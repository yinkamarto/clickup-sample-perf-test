import { Pool, Client } from 'pg';


let user = process.env.POSTGRESQL_USER;
let host = process.env.DB_HOST || 'db';
let database = process.env.DB_NAME;
let password = process.env.POSTGRESQL_PW;
let port = parseInt(process.env.DB_PORT || '5432');
let db_url: string = `postgresql://${user}:${password}@${host}:${port}/${database}`;

function setUpUserTable(client: Client): void{
    const dropTableQuery = `DROP TABLE IF EXISTS users`;
    client.query(dropTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "users" deleted or does not exist.');
    });

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )
    `;
    client.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "users" created or already exists.');
    });
};

const pool = new Pool({
    connectionString: db_url,
});

const client = new Client({connectionString: db_url});
client.connect();
setUpUserTable(client);


export default pool;