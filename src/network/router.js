import user from '../components/user/network'
import path from '../components/auth/network'
import book from '../components/book/network'

const route = app => {
    app.use('/users', user)
    app.use('/auth', path)
    app.use('/books', book)
}

export default route