import user from '../components/user/network'
import path from '../components/auth/network'

const route = app => {
    app.use('/users', user)
    app.use('/auth', path)
}

export default route