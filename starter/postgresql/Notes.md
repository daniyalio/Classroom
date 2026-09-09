| File                | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `db.js`             | **Connect the running application to the database**             |
| `drizzle.config.js` | **Tell Drizzle's tools how the project/database is configured** |
| `schema.js`         | **Describe what the database tables look like**                 |
| `server.js`         | **Handle HTTP requests and use the database**                   |



                  ┌──────────────┐
                  │  server.js   │
                  │ Express API  │
                  └──────┬───────┘
                         │
                         ↓
                  ┌──────────────┐
                  │    db.js     │
                  │ DB connection│
                  └──────┬───────┘
                         │
                         ↓
                  ┌──────────────┐
                  │   Drizzle    │
                  └──────┬───────┘
                         │
                         ↓
                  ┌──────────────┐
                  │ PostgreSQL   │
                  │    Neon      │
                  └──────────────┘


schema.js
   ↓
Describes database tables

drizzle.config.js
   ↓
Configures Drizzle's tools