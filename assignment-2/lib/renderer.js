const Nunjucks = require('nunjucks')

const renderer = new Nunjucks.Environment(
	new Nunjucks.FileSystemLoader('views')
)

module.exports = renderer