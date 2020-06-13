import user from '../components/user/network'

const route = app => {
    app.use('/users', user)
}

export default route