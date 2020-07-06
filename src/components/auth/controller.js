// Importing Utils
import { compare } from '../../utils/bcrypt'
import { sign } from '../../utils/jwt'

// Importing components
import { getCredential } from '../../database/firebase/store'

export const logIn = async access => {
    // Validate if exist field to credential for access
    if(!access.email || !access.password) {
        return { info: 'To perform the authentication process you must have the email and password model', status: 422 }
    }

    // Validate if email exists in the database
    const result = await getCredential(access.email, 'users')
    if(!result) {
        return { info: 'Invalid Credential', status: 401}
    }

    // Validate input password is valid
    const credentialValid = await compare(access.password, result.data.password)
    if(!credentialValid) {
        return { info: 'Invalid credential', status: 401 }
    }
    
    // Generate token
    const token = sign({email: result.data.email, username: result.data.username, id: result.id})
    return { info: token, status: 200 }
}