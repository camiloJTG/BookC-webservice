import user from '../components/user/network'
import path from '../components/auth/network'
import file from '../components/book/network'

const route = app => {
    app.use('/users', user)
    app.use('/auth', path)
    app.use('/file', file)
}

export default route