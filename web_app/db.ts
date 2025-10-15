import { Pool, Client } from 'pg';


let db_url: string = 'postgresql://db_user:password@db:5432/web_app_db';

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
    user: process.env.POSTGRESQL_USER,
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME,
    password: process.env.POSTGRESQL_PW,
    port: parseInt(process.env.DB_PORT || '5432'),
});

const client = new Client({connectionString: db_url});
client.connect();
setUpUserTable(client);


export default pool;