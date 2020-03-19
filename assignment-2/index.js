require('module-alias/register')
const express = require('express')
const path = require('path')
const queryString = require('query-string')

const { DEFAULT_PORT } = require('@lib/constants')
const renderer = require('@lib/renderer')

const PORT = process.env.PORT || DEFAULT_PORT
const app = express()

app.use(express.static('static'))

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './static/index.html'))
})

app.get('/detail', (request, response) => {
    const name = request.query['match-name']
    const description = request.query['match-description']
    const url = `${request.protocol}://${request.host}${request.originalUrl}`

    response.send(renderer.render('detail.html', { name, description, url }))
})

app.get('/share', (request, response) => {
    const { email, name, description, url } = request.query

    response.send(renderer.render('share.html', { email, name, description, url }))
})

app.listen(PORT, () => {
    console.log(`Development server listening on http://localhost:${PORT}`)
})