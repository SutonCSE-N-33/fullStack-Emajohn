const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://taherIslam:taher09@cluster0.6u8iq.mongodb.net/emaJohn?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const pass = "taher09";
const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


client.connect(err => {
  const collection = client.db("emaJohn").collection("products");
  const orderCollection = client.db("emaJohn").collection("order");
  app.post('/addProducts',(req,res) => {
    const products = req.body;
    collection.insertMany(products)
    .then(result => {
      res.send(result)
    })
  })

  app.get('/products',(req,res)=> {
    collection.find({})
    .toArray((err,documents) => {
      res.send(documents)
    })
  })

  app.get('/product/:key',(req,res)=> {
    
    collection.find({key:req.params.key})
    .toArray((err,documents) => {
      res.send(documents[0])
    })
  })

app.post('/productsByKeys',(req,res) => {
  const keys = req.body;
  collection.find({key:{ $in:keys}})
  .toArray((err,documents) =>{
  res.send(documents)
  })
})


app.post('/addOrder',(req,res)=>{
       orderCollection.insertOne(req.body)
       .then(result =>{
         console.log("inserted Successfully")
       })
})

});

app.listen(5000,()=>console.log("Alhamdulillah"));