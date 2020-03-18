require('module-alias/register')
const express = require('express')
const path = require('path')

const { DEFAULT_PORT } = require('@lib/constants')

const PORT = process.env.PORT || DEFAULT_PORT
const app = express()

app.use(express.static('static'))

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './static/index.html'))
})

app.listen(PORT, () => {
    console.log(`Development server listening on http://localhost:${PORT}`)
})