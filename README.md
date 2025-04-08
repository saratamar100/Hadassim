For exercise 4:
run the server with:

1. "node createTables.js"
2. "node insertData.js"
3. "node api.js"

run the client with:
"npm run dev"

in the server you need to add file ".env" contains:
USERNAME_SELLER =x
PASSWORD_SELLER =x
KEY_SUPPLIERS = x
KEY_SELLER = x

use the data from .env to login to the seller page
user "tnuva" username and "1" password" to login to the suppliers page

add file "dbconfig.js" with data of database:
const dbconfig = {
  host: "localhost",
  user: "root",
  password: "?",
  database: "?",
  port: 3306,
};

module.exports = dbconfig;

