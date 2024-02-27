const express = require('express');
const { MongoClient } = require('mongodb');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt')
require('dotenv').config();

const uri = process.env.ATLAS_URI

const PORT = 4000
const app = express()
app.use(cors())
app.use(express.json())

// home page
app.get('/', (req, res) => {
    res.json("Hello check home")
})

// sign up
app.post('/signup', async(req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    // Generated unique user id
    const uniqueUserId = uuidv4()

    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        await client.connect()
        const db = client.db('app-data')
        const users = db.collection('users')

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(409).send('username already exist')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: uniqueUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }

        const newUser = await users.insertOne(data)
        const token = jwt.sign(newUser, sanitizedEmail, 
            {expiresIn: 60 * 12
        })

        res.status(201).json({ token, userId: uniqueUserId})

    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})

// Log in 
app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    try {
        await client.connect()
        const db = client.db('app-data')
        const users = db.collection('users')

        const user = await users.findOne({ email })

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 12
            })
            res.status(201).json({token, userId: user.user_id})
        }

        res.status(400).json('Invalid Credentials')

    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})

// get preferrred cuisine users

app.get('/cuisine-users', async(req, res) => {
    const client = new MongoClient(uri)
    const cuisine = req.query.cuisine

    console.log(cuisine)
    try {
        await client.connect()
        const db = client.db('app-data')
        const users = db.collection('users')
        const query = { specialized_cuisine : {$eq : cuisine}}
        const foundUsers = await users.find(query).toArray()
        res.send(foundUsers)
    } finally {
        await client.close()
    }
})

// get one user

app.put('/user', async(req, res) => {
    const client = new MongoClient(uri);
    const formData = req.body.formData

    console.log(formData)
    try {
        await client.connect()
        const db = client.db('app-data')

        const users = db.collection('users')

        const query = { user_id: formData.user_id }
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                gender_identity: formData.gender_identity,
                show_gender: formData.show_gender,
                dietery: formData.dietery,
                specialized_cuisine: formData.specialized_cuisine,
                preferred_cuisine: formData.preferred_cuisine,
                about: formData.about,
                favorite_dish: formData.favorite_dish,
                url: formData.url,
                matches: formData.matches
            },
        }
        const newUser = await users.updateOne(query, updateDocument)

        res.send(newUser)
    } finally {
        await client.close()
    }
})

// get particular user

app.get('/user', async(req, res) => {

    const client = new MongoClient(uri)

    const userId = req.query.userId

    try {
        await client.connect()
        const db = client.db('app-data')
        const users = db.collection('users')

        const query = { user_id: userId }
        const user = await users.findOne(query)

        res.send(user)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
