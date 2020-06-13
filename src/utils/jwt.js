import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET_KEY

export const sign = (payload) => {
    const token = jwt.sign(payload, secret)
    return token
}

