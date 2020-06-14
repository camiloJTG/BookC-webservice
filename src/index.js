import '@babel/polyfill'
import 'dotenv/config'
import express from 'express'
import route from './network/router'
import { config } from './utils/multer'
import { join } from 'path'

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use(config())

// Static field
app.use(express.static(join(__dirname, 'public')))

// Server
const main = () => {
    app.listen(process.env.PORT || process.env.PORT_SERVER)    
    route(app)
    console.log(`Server on port ${process.env.PORT_SERVER}`)
}

main()