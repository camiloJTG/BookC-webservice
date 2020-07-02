import { generateHash } from '../../utils/bcrypt'
import { get, create, getByParameter, remove, update } from '../../database/firebase/store'

const TABLE = 'users'

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
    // Validate if id exists
    if(!id.id) {
        return { info: 'The user id was not found in the database', status: 404 }
    }

    // Get the current user
    const currentUser = await get(id.id, TABLE)
    if(!currentUser.data) {
        return { info: 'The user you want to update is not in the database', status: 404 }
    }

    // Validate if the email input is not registered
    if(user.email) {
        const emailExist = await getByParameter(TABLE, user.email, 'email')
        if(emailExist.length !== 0) {
            return { info: `The email ${user.email} is already registred. Please, try again with another mail`, status: 428 } 
        }
    }

    // Validate if the email input is not registered
    if(user.username) {
        const usernameExist = await getByParameter(TABLE, user.username, 'username')
        if(usernameExist.length !== 0) {
            return { info: `The username ${user.username} is already registered. Please, try again with another username`, status: 428 }
        }
    }
    // Hashing password
    if(user.password) {
        const hashPassword = await generateHash(user.password)
        user.password = hashPassword
    }

    // Update user
    if(user.username || user.email || user.password) {
        user = { ...user, updatedAt: Date.now() }
        await update(id.id, TABLE, user)
        return { info: 'user updated', status: 200 }
    }
    return { info: 'No data to update', status: 422 }
}