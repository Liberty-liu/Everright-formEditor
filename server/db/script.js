import Database from 'better-sqlite3'
import path from 'path'
import url from 'url'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const db = new Database(path.resolve(__dirname, './', 'Everright.db'))
db.exec(`CREATE TABLE object (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
content TEXT,
create_timestamp DEFAULT (unixepoch('now')),
update_timestamp DEFAULT (unixepoch('now'))
)`)
db.exec(`CREATE TABLE object_table (
id INTEGER PRIMARY KEY AUTOINCREMENT,
obj_id TEXT NOT NULL,
content TEXT,
create_timestamp DEFAULT (unixepoch('now')),
update_timestamp DEFAULT (unixepoch('now'))
)`)
db.exec(`CREATE TABLE field (
id INTEGER PRIMARY KEY AUTOINCREMENT,
obj_id TEXT NOT NULL,
content TEXT,
create_timestamp DEFAULT (unixepoch('now')),
update_timestamp DEFAULT (unixepoch('now'))
)`)
