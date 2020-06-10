import express from 'express'
import { success, error } from '../../network/response'
import { readUser, getUser, createUser } from './controller'

const router = express.Router()

router.get('/', async (req, res) => {
    const result = await readUser()
    try {
        success(req, res, result, 200)
    } catch (e) {
        error(req, res, result, 400)
    }
})

router.get('/:id', async (req, res) => {
    const result = await getUser(req.params)
    try {
        success(req, res, result, 201)
    } catch (e) {
        error(req, res, result, 400)
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
        error(req, res, 400)
    }
})

export default router