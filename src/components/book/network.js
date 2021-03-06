import express from 'express'
import { checkAuth } from '../../middleware/authorization'
import { createBook, getByIdBook, getByUserId, deleteBook, updateBook } from './controller'
import { error, success } from '../../network/response'

const route = express.Router()

// GET:ID BOOK
route.get('/:id', checkAuth, async (req, res) => {
    try {
        const result = await getByIdBook(req.params)
        if(result.status === 200) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.log(`[GET:ID BOOK] - Internal Server Error. Info. ${e.message}`)
        return error(req, res, null, 400)
    }
})

// GET:ID USER
route.get('/user/:id', checkAuth, async (req, res) => {
    try {
        const result = await getByUserId(req.params)
        if(result === 200) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.log(`[GET:ID USER] - Internal Server Erro. Info. ${e.message}`)
        return error(req, res, null, 400)
    }
})

// POST BOOK
route.post('/', checkAuth, async (req, res) => {
    try {
        const result = await createBook(req.body, req.file)
        if(result.status === 201) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.error(`[POST BOOK] - Internal Server Error. Info. ${e.message}`)
        return error(req, res, null, 400)
    }
})

// DELETE BOOK
route.delete('/:id', checkAuth, async (req, res) => {
    try {
        const result = await deleteBook(req.params)
        if(result.status === 200) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.error(`[DELETE BOOK] - Internal Server Error. Info. ${e.message}`)
        return error(req, res, null, 400)
    }
})

// PUT BOOK
route.put('/:id', checkAuth, async (req, res) => {
    try {
        const result = await updateBook(req.params, req.body, req.file)
        if(result.status === 200) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.error(`[PUT BOOK] - Internal Server Error. Info ${e.message}`)
        return error(req, res, null, 400)
    }
})

export default route