const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');


const serviceAccount = require("./internsample1-firebase-adminsdk-ofepo-02f14ae094.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(bodyParser.json());
const port  = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
    })

app.get('/token' , (req, res) =>{
    console.log(req.headers.authorization);
    console.log("this working")
})

app.listen(port);