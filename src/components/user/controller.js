// Importing utils
import { generateHash, generateSalt } from '../../utils/bcrypt'

// Importing component
import { get, read, create, getByParameter } from '../../database/firebase/store'

// GLOBAL VARIABLE
const TABLE = 'users'

export async  function readUser() {
    const result = read(TABLE)
    return result
}

export function getUser(id) {
    const result = get(id.id, TABLE)
    if(result === [] || result === undefined || result === null) {
        return 'The id was not found in the database'
    }
    return result
}

export async function createUser(user) {
    // Validate if user model is correct
    if(!user.email || !user.password || !user.username) {
        return { info: 'The email, password and username field needed to create the user were not found', status: 422 }
    }
    // Validate if the email input is not registered
    const emailExist = await getByParameter(TABLE, user.email, 'email')
    if(emailExist) {
        return { info: `The email ${user.email} is already registred. Please, try again with another mail`, status: 428 } 
    }

    // Hashing password
    const hashPassword = await generateHash(user.password)

    // Creating user object
    const newUser = {
        username: user.username,
        password: hashPassword,
        email: user.email,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }

    const result = await create('users', newUser)
    return { info: result, status: 201 } 
}