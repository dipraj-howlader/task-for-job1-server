const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
require('dotenv').config()


const serviceAccount = require('./internsample1-firebase-adminsdk-ofepo-02f14ae094.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(bodyParser.json());
const port  = 5000 

app.get('/', (req, res) => {
    res.send('Hello World!')
    })
//server

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wthiz.mongodb.net/assignmentTaskOne?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const useCollection = client.db("assignmentTaskOne").collection("userCollection");
  
  app.post("/addUser",(req,res) =>{
    const newUser = req.body;
    console.log(newUser);
    useCollection.insertOne(newUser)
    .then(result => {
      console.log('inserted ', result.insertedCount)
      res.send(res.insertedCount > 0)
    })
  })

app.get("/user", (req,res) =>{

  const bearer  = req.headers.authorization
  let idToken = '';
if(bearer && bearer.startsWith('Bearer ')){
 idToken = bearer.split(' ')[1]

 admin.auth().verifyIdToken(idToken)
.then((decodedToken) => {
  const idEmail = decodedToken.email;
  console.log(idEmail);
  if(idEmail){
    useCollection.find()
    .toArray((err, user) => {
      res.send(user);
  
    })
  }

  // ...
})
.catch((error) => {
  // Handle error
});
}
  //do
 
})
//delete
app.delete('/delete/:id' , (req, res)=> {
  useCollection.deleteOne({_id: ObjectID(req.params.id)})
  .then((result) =>{
    console.log(result);
  })
})





    
})

app.listen(process.env.PORT || port);