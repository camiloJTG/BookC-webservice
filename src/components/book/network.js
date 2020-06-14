import express from 'express'
import { createBook } from './controller'

const route = express.Router()

route.post('/', (req, res) => {
    createBook(req.body, req.file)
})

export default route