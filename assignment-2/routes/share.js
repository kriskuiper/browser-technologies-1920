const renderer = require('@lib/renderer')

module.exports = (request, response) => {
    const { id, classification, ranking } = request.query

    response.send(renderer.render('share.html', { id, classification, ranking }))
}