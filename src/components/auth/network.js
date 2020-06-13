import express from 'express'
import { error, success } from '../../network/response'
import { logIn } from './controller'

const router = express.Router()

// POST AUTH
router.post('/', async (req, res) => {
    try {
        const result = await logIn(req.body)
        if(result.status === 200) {
            return success(req, res, result.info, result.status)
        }
        return error(req, res, result.info, result.status)
    } catch (e) {
        console.log(`[POST AUTH] - Internal Server Error. Info: ${e.message}`)
        return error(req, res, null, 400)
    }
    const result = await logIn(req.body)
    res.send(result)
})

export default router