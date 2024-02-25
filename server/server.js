require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const uri = process.env.ATLAS_URI;

const PORT = 4000;
const app = express();

app.get('/', (req, res) => {
    res.json("Hello check home")
})

app.post('/signup',(req, res) => {
    const client = new MongoClient(uri)
    res.json('hello signup')
})

app.get('/users', async(req, res) => {
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const db = client.db('app-data')

        const users = db.collection('users')

        const returnedUsers = await users.find().toArray()

        res.send(returnedUsers)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
