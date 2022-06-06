const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


mongoose.connect(`mongodb+srv://ilgor:rewfznwStGmPGSYk@cluster0.rilti.mongodb.net/crud?retryWrites=true&w=majority`)

const crudSchema = {
    name: String,
    desc: String,
    number: Number
}
//data model
const Crud = mongoose.model('crud', crudSchema)

//get
app.get('/crud', async (req, res) => {
    await Crud.find()
        .then((contact) => {
            res.json(contact)
        })
        .catch((error) => {
            res.status(404).json(error)
        })
})

//create route
app.post('/newCrud', async (req, res) => {
    const { name, desc, number } = req.body
    const newCrud = new Crud({
        name,
        desc,
        number
    })
    await newCrud.save()
        .then((crud) => {
            console.log(crud);
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

app.listen(3001, () => {
    console.log('Server running on port 3001');
})