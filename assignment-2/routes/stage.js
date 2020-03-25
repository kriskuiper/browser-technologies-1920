const renderer = require('@lib/renderer')
const db = require('@database/db-instance')

module.exports = (request, response) => {
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
}