const express = require('express')
const path = require('path')
const uid = require('uuid').v4
const app = express()

let Contacts = [
    { id: uid(), name: 'Tester', value: '89997438492', marked: false }
]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
    res.status(200).json(Contacts)
})

app.post('/api/contacts', (req, res) => {
    /* const id = uuid.v1()
    const name = req.body.name
    const value = req.body.value */

    const newContact = { ...req.body, marked: false, id: uid() }

    Contacts.push(newContact)

    res.status(201).json(newContact) // 201 - element was created
})

app.put('/api/contacts/:id', (req, res) => {
    /* const contact = Contacts.find(c => c.id === req.params.id)
    contact.marked = true 
    res.json(contact) */
    const index = Contacts.findIndex(c => c.id === req.params.id)
    Contacts[index] = req.body

    res.json(Contacts[index])
})

app.delete('/api/contacts/:id', (req, res) => {
    Contacts = Contacts.filter(c => c.id !== req.params.id)
    res.json({mes: 'ok'})
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/index.html'))
})

app.listen(9000, () => console.log('server started'))