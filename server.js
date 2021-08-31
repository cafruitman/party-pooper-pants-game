import express from 'express'
import mongoose from 'mongoose'
import Questions from './dbQuestions.js'
import Cors from 'cors'
import password from './dbPassword.js'

//App Config
const app = express()
const port = 3000
const connection_url = `mongodb+srv://admin:${password}@cluster0.lwnk7.mongodb.net/partypooperpantsdb?retryWrites=true&w=majority`

//Middlewares
app.use(express.json())
app.use(Cors())

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//API Endpoints
app.get('/', (req, res) => res.status(200).send("Hello"))

app.post('/partypooperpants/question', (req, res) => {
    const dbQuestion = req.body

    Questions.create(dbQuestion, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/partypooperpants/question', (req, res) => {
    Questions.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`))