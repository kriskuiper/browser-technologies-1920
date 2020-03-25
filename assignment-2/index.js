require('module-alias/register')
const express = require('express')
const path = require('path')
const queryString = require('query-string')

const { DEFAULT_PORT } = require('@lib/constants')
const renderer = require('@lib/renderer')
const db = require('@database/db-instance')

const PORT = process.env.PORT || DEFAULT_PORT
const app = express()

app.use(express.static('static'))

app.get('/', (request, response) => {
    const stage = db
        .get('stages').find({ id: 1 })
        .value()

    response.send(renderer.render('index.html', { stage }))
})

app.get('/stage-:id/:classification/:ranking', (request, response) => {
    const { id, classification, ranking } = request.params
    const stageId = Number(id)

    const stage = db
        .get('stages').find({ id: stageId })
        .value()

    const standings = stage[classification][ranking]
    const riders = standings
        .map(rider => {
            return db.get('riders')
                .find({ rider_nr: rider.rider })
                .value()
        })
    
    const data = standings
        .map((rider, index) => {
            return {
                ...rider,
                ...riders[index]
            }
        })
        .sort((a, b) => {
            if (a.rank > b.rank) {
                return 1
            } else {
                return -1
            }
        })

    response.send(renderer.render('index.html', {
        stage,
        data,
        classification,
        ranking
    }))
})

app.listen(PORT, () => {
    console.log(`Development server listening on http://localhost:${PORT}`)
})