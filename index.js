const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
require('dotenv').config()

const serviceAccount =  {
  "type": "service_account",
  "project_id": "internsample1",
  "private_key_id": "02f14ae0948fc8e8062719ce9df8abc3d8f7fe0e",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCe28fD3dTcU5si\nJVzvxNZ7ex5NPg2tcbaKWx8DuAJ74FYyuQ+37IcN6+cGi6F+es6py72iWuJnP45e\njA0Oue+6AqB42r/A2av+53RSml4nI849L/9c4ninxCxfZ1CrtNEhYU5yu5BclmRU\ncgTAGYQZPoiP6itqOt+kK1VlNtFrc44CpxWEowWIxcGUF5N7LbFTaE0q3UXiI8gk\n20S3lfVdcQNJrKFblErAvzP4ttBySUnsGe+ARRf+eDEtxaZbJkAVTXdCgvnrmgDx\nJm5cQVVm0CUVcmqy0BPxo9m5EhC3cRctD1hLImVbUfWIG1j4tFAj7woMDD/JHV4C\nLqAThCtvAgMBAAECggEAJrQHPIosVS2taylNNkFvvA/n9wu6S1qcDaNbsA1B1ap3\ndc4urTHcSaEC3U5hny4OccHoxsh7xonuhsx6Ve8pH9mJ/UfWVgbyZ50+cu2XKNQJ\naFDsV1X57W3XHbtPJTZdiVNqyHs4FcayVPyeear9yyS4Is/7mdsUJ6xDFvC/Hv1b\nA6uRAuuIxerl8jXaU6BG0qxw8hxPd6A5ZdOLT8dP9ftR4s9A7MGE3vJpFpLJnj6u\nrV+B2b3LOdFD8cXg00HAs4oly3Y8nJK5nauQN4UsQ6P53ROCISoBSaGRZj8FX7W8\nuwLcZY2+zxDbFKWguC3cXGMulq9USXh46fGLNuFvoQKBgQDL3nYO6uLyUhxPDVZr\ng1xGcQ6d8N3+ep9fho7wOrGKBOoVQhEcvvD90anZFJJ5VB7b0wem0u/fKdTEX8dy\nB91Zx0+RcVKO6+iL1rTw+vXwGi10eNW3WJ6ZEDb0miB7uc7cHbw3jrFCF0zaHCKy\nfQR0xXE50SnnT8xi8dFWedXfPwKBgQDHet98mJ6F06GDYBodcVKvWJ899cnU2V97\n7/i3IlfxFsVdXHv8N+k6ChxUMIqg0kKoQ9g9mCB5RhSbNCiWE6gCKlpKeqBHjYAS\nkuF/o65jJ2cijtVwNglbp2uIHbPQC3wIalna8ACEAyO2PrsLn3KJrTiddJanaGvc\nrLINQtXX0QKBgBjwWL7Qavy7oKzm88hpJFOVpvUZLv7fXzmfS0MF2wwIN95r244J\nqY9TI5TjmFtxN+kqMohsy10gT9/J26sOXTyLTid7ll7XavYYSMAl4woBGchis7of\nBB+zRRW8+PZJr41rsceWFAcCtKsFwBTXiEEEmio5dQfP0i/UZwhOFSSfAoGBAL43\nvzEy38dBnXyHgZ+d1nj6iy8sWAAuIE0w8fzANRfi3OVAMcK7Fh2QUp89gpQErCeE\nOonRrPW4DCJLxIAH0mfuNxdag8h3eC89/OYYEUzf4AsmJQXRoW7S4Ul0+Whj6yyj\nLXgG8Jbx33YDr51PuIrssVYEPTz56BEQZOEcYIphAoGAQEmJe6i+fBF9XLSuHN2c\n5M0Bxlz4//VvYAca+aTcqjZiadlYIJAlgdYOxWh2CrBIhenaRJIzUNRmvuoVmXZy\nGQRLWVW3iqTa4cRCmuk5/pvu56CG5c/NEdaMWV35Kpd8hTEYcbrJpoTLlH+56GiB\nvBV09KpHZKg5nVFLy0nxtdA=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ofepo@internsample1.iam.gserviceaccount.com",
  "client_id": "107941098663777499592",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ofepo%40internsample1.iam.gserviceaccount.com"
}


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