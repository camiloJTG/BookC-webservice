import '@babel/polyfill'
import express from 'express'
import 'dotenv/config'
import route from './network/router'

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false }))

// Static field

// Server
const main = () => {
    app.listen(process.env.PORT || process.env.PORT_SERVER)    
    route(app)
    console.log(`Server on port ${process.env.PORT_SERVER}`)
}

main()