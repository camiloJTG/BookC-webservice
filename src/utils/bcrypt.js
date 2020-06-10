import bcrypt from 'bcrypt'

async function generateSalt() {
    const salt = await bcrypt.genSalt(10)
    return salt.toString()
}

export async function generateHash(password) {
    const salt = await generateSalt()
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export async function compare(textPlanePassword, hashPassword) {
    const compare = await bcrypt.compare(textPlanePassword, hashPassword)
    return compare
}