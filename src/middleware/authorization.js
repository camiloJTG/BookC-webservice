import { decode, verify } from '../utils/jwt'
import { error } from '../network/response'

export const checkAuth = (req, res, next) => {
    const token = req.headers['x-access-token'] || ''
    
    const decodedToken = decode(token)
    if(!decodedToken) {
        return error(req, res, 'Invalid Token', 401 )
    }

    const verifyToken = verify(token)
    if(!verifyToken) {
        return error(req, res, 'Invalid Token', 401 )
    }
    next()
}