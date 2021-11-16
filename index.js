const express=require('express')
const cors=require('cors');
const bodyParser=require('body-parser')
const env=require('dotenv')
const mongodb=require('mongodb');
const {ObjectId}=require('mongodb')
const { MongoClient } = require('mongodb');


const app=express()
app.use(cors())
app.use(bodyParser.json())

const uri = "mongodb+srv://travel:2470rijon@cluster0.msjpp.mongodb.net/travels?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
    const collection = client.db("travels").collection("tour");
   //console.log('db connected')
//post single data
   app.post('/singletour', (req, res) => {
    try {
        
       collection.insertOne(req.body);
        res.send("data-post")
        console.log(req.body)
    }
    catch (err) {
        console.log(err.message)
    }

})

//post all data
app.post('/tour',  (req, res) => {

    try {
        collection.insertMany(req.body)
        //console.log(req.body)
        res.send("data posted")

    }
    catch (err) {
        console.log(err.message);
    }

})

//get all data
app.get("/alltour", (req, res) => {
 
          collection.find({})
        .toArray((err,documents)=>{
            res.send(documents);
        })
        
    
   
})

//get single data
app.get('/singletour/:id',  (req, res) => {
    console.log(req.params.id)
    try {
         collection.find({ _id:ObjectId( req.params.id) })
         .toArray((err,document)=>{
                res.send(document[0]);
         })
        
         
    }
    catch (err) {
        console.log(err.message)
    }
})
    
  });


  client.connect(err => {
    const collections = client.db("travels").collection("bookdata");
    // perform actions on the collection object
    console.log("db connected")

    //post bookdata
    app.post('/bookdata',  (req, res) => {

        
            collections.insertOne(req.body);
            
            res.send("send");
       
        
    })

    //getsinglebookData
   app.get('/bookdata', async (req, res) => {

    collections.find({})
    .toArray((err,document)=>{{
        res.send(document);
    }})
   
})

//getallbookdata
app.get('/allbook', (req, res) => {
    
         collections.find({})
         .toArray((err,document)=>{
             res.send(document)
         })
        
    
   
        
    
})



//delete book data
app.delete('/remove/:id', async (req, res) => {
    console.log(req.body)

    
        collections.deleteOne({ _id:ObjectId(req.params.id) })

        res.status(200).json({
            success: "Deleted"
        })

    
  
})

//update book
app.put('/update/:id',  (req, res) => {

   
       collections.updateOne({ _id:ObjectId( req.params.id) }, {$set:{ status: "Approved"}
           
        })
        res.send("updated")
        //console.log("updated")
  
    
})

  });

app.get("/",(req,res)=>{
    res.send("bal")
})

app.listen(5000,(req,res)=>{
    console.log("server start")
})
