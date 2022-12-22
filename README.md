# Authentication Service

## Project Setup

- Clone the repository
- Execute `npm install` in the root directory of project
- Create `.env` file in the root directory and add following vairable(s) :
  - `PORT = 4001` // or which ever port you wanna use.
- Inside the `src/config` folder create a new file `config.json` and then add the following json for DB configurations :

```
{
  "development": {
    "username": <DB_USERNAME>,
    "password": <DB_PASSWORD>,
    "database": <DB_NAME : "AUTH_DB_DEV">,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

- Once you've aded your db config as listed above, go to `src` folder from your terminal and execute `npx sequelize db:create` and then execute
  `npx sequelize db:migrate`
- In the `src` directory itself execute `npx sequelize db:seed:all` to seed the data
