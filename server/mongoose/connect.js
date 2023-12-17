const mongoose = require('mongoose')

const url = 'mongodb+srv://mongo:mongo@cluster0.j0jbdd5.mongodb.net/learning-app-db?retryWrites=true&w=majority'
mongoose.connect(url)
.then(console.log('connection successful')).catch( (e) => console.log(e))