import express from 'express'
import { success, error } from '../../network/response'
import { checkAuth } from '../../middleware/authorization'
import { getUser, createUser, deleteUser, updateUser } from './controller'

const router = express.Router()

// GET:ID USER
router.get('/:id', checkAuth, async (req, res) => {
    try {
        const result = await getUser(req.params)
        if(result.status === 200) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.error(`[GET:ID USER] - Internal Server Error. Info: ${e.message}`)
        return error(req, res, null, 400)
    }
})

// POST USER
router.post('/', async (req, res) => {
    try {
        const result = await createUser(req.body)
        if(result.status === 201) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.error(`[POST USER] - Internal Server Error. INFO. ${e.message}`)
        return error(req, res, null, 400)
    }
})

// DELETE USER
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const result = await deleteUser(req.params)
        if(result.status === 200) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.error(`[DELETE USER] - Internal Server Error. INFO. ${e.message}`)
        return error(req, res, null, 400)
    }
})

// PUT USER
router.put('/:id', checkAuth, async (req, res) => {
    try {
        const result = await updateUser(req.params, req.body)
        if(result.status === 200) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.error(`[PUT USER] - Internal Server Error. INFO. ${e.message}`)
        return error(req, res, null, 400)
    }
})

export default router