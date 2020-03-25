const renderer = require('@lib/renderer')

module.exports = (request, response) => {
    const {
        email,
        stage_id,
        classification,
        ranking,
        message
    } = request.query
    const url = `${request.protocol}://${request.host}/stage-${stage_id}/${classification}/${ranking}`
    const userMessage = `
        ${message}
        
        Check it out: ${url}
    `

    response.send(renderer.render('send.html', { email, message: userMessage }))
}