<h1 align="center">ExpressJS - Back End - MuiChat-Web-API</h1>

in this pandemic era, the distance needed for people around us so that making direct communication makes us feel difficult, with MuiChat it is easy to communicate more easily and easily.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3001/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/15290177/Tzscp6oB)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
PORT=3009
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=telegram
SMTP_EMAIL= [your email ]
SMTP_PASSWORD= [your email password]
```

## License

© [Ricky Syahputra](https://github.com/rickyganteng/)
