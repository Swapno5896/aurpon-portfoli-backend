const express = require('express')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
const app = express()
// mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
// midduleware
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000


const uri = "mongodb+srv://nogod:5896@cluster0.kv6ok.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const homeContentCollection = client.db('aurpon-backend').collection('home')


        app.get('/home', async (req, res) => {
            const query = {}
            const cursor = homeContentCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        })
        // update user
        app.put('/home/:id', async (req, res) => {
            const id = req.params.id
            const updatedUser = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: updatedUser


                // $set: {
                //     name: updatedUser.name,
                //     email: updatedUser.email
                // }

            }
            const result = await homeContentCollection.updateOne(filter, updatedDoc, options)
            res.send(result)

        })




        /*
        
        
        
        
        
        
        
        
        
        
        
                app.post('/user', async (req, res) => {
                    const user = req.body
                    console.log(user);
                    const result = await userCollection.insertOne(user);
                    res.send({ result })
                })
        
                app.get('/user', async (req, res) => {
                    const query = {}
                    const cursor = userCollection.find(query)
                    const users = await cursor.toArray()
                    res.send(users)
                })
                // update user
                app.put('/user/:id', async (req, res) => {
                    const id = req.params.id
                    const updatedUser = req.body
                    const filter = { _id: ObjectId(id) }
                    const options = { upsert: true }
                    const updatedDoc = {
                        $set: updatedUser
        
        
                        // $set: {
                        //     name: updatedUser.name,
                        //     email: updatedUser.email
                        // }
        
                    }
                    const result = await userCollection.updateOne(filter, updatedDoc, options)
                    res.send(result)
        
                })
                app.delete('/user/:id', async (req, res) => {
                    const id = req.params.id
                    const query = { _id: ObjectId(id) }
                    const result = await userCollection.deleteOne(query)
                    res.send(result)
                })
        
                // find user by id
                app.get('/user/:id', async (req, res) => {
                    const id = req.params.id
                    const query = { _id: ObjectId(id) }
                    const result = await userCollection.findOne(query)
                    res.send(result)
                })
                */
    }
    finally {
        // await client.close()
    }
}
// calling the funcion
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})