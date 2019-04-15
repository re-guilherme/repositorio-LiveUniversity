const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (request, response) => {
	response.render('home', {
		date: new Date()
	})
})

app.listen(3000, (err) => {
	if(err){
		console.log('Could not start the server')
	}
	else{
		console.log('Server is up and running...')
	}
})