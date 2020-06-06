import express from 'express'
import { success, error } from '../../helper/response'

const router = express.Router()

router.get('/', (req, res) => {
    success(req, res, 'send data')
})

export default router