require('module-alias/register')
const express = require('express')

const handleStageRoute = require('@routes/stage')

const { DEFAULT_PORT } = require('@lib/constants')

const PORT = process.env.PORT || DEFAULT_PORT
const app = express()

app.use(express.static('static'))

app.get('/', (request, response) => {
    response.redirect('/stage-1/stage_ranking/yellow')
})

app.get('/stage-:id/:classification/:ranking', handleStageRoute)

app.listen(PORT, () => {
    console.log(`Development server listening on http://localhost:${PORT}`)
})