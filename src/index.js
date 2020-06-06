import '@babel/polyfill'
import express from 'express'
import { config } from 'dotenv'

const app = express()

// Settings
config() // Call config to dotenv

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false }))

// Routes
import route from './router'
route(app)

// Static field

// Server
async function main() {
    app.listen(process.env.PORT || process.env.PORT_SERVER)
    console.log(`Server on port ${process.env.PORT_SERVER}`)
}

main()