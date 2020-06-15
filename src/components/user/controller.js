// Importing utils
import { generateHash } from '../../utils/bcrypt'

// Importing component
import { get, read, create, getByParameter, remove, update } from '../../database/firebase/store'

// GLOBAL VARIABLE
const TABLE = 'users'

export const readUser = async () => {
    const result = await read(TABLE)
    if(result.length === 0) {
        return { info: 'There are not registered users on the platform', status: 404 }
    }
    return { info: result, status: 200 }
}

export const getUser =  async id => {
    const result = await get(id.id, TABLE)
    if(!result) {
        return { info: 'User not found', status: 404 }
    }
    if(!result.data) {
        return { info: 'User not found', status: 404 }
    }
    return { info: result, status: 200 }
}

export const createUser = async user => {
    // Validate if user model is correct
    if(!user.email || !user.password || !user.username) {
        return { info: 'The email, password and username field needed to create the user were not found', status: 422 }
    }

    // Validate if the email input is not registered
    const emailExist = await getByParameter(TABLE, user.email, 'email')
    if(emailExist.length !== 0) {
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

export const deleteUser = async id => {
    const result = await remove(id.id, TABLE)
    if(!result) {
        return { info: 'User not found', status: 404 }
    }
    return { info: 'User deleted', status: 200 }
}

export const updateUser = async (id, user) => {
    // Validate if the email input is not registered
    if(user.email) {
        const emailExist = await getByParameter(TABLE, user.email, 'email')
        if(emailExist.length !== 0) {
            return { info: `The email ${user.email} is already registred. Please, try again with another mail`, status: 428 } 
        }
    }
    
    // Hashing password
    if(user.password) {
        const hashPassword = await generateHash(user.password)
        user.password = hashPassword
    }

    // Update user
    if(user) {
        const newUser = {updatedAt: Date.now(), ...user}
        const result = await update(id.id, TABLE, newUser)
        return { info: 'user updated', status: 200 }
    }
    return { info: 'No data to update', status: 422 }
}