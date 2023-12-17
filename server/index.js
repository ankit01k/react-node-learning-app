const express = require('express')
const usersRouter = require('./courseRouter')
const app = express()

//app.use(express.json())
//app.use(bodyParser.json())

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    
    // res.header("Access-Control-Allow-Headers", "*")
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "*")
    }
    next()
})
app.use(usersRouter)

app.get("/", (req,res)=> {
    res.send("Hello")
})

app.listen(8001, () => {
    console.log('Listen')
})