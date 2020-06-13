import db from './connection'

export const read = async table => {
    const result = await db.collection(table).get()
    let collectionUser = []
    result.forEach(docs => {
        let users = {id: docs.id, data: docs.data()}
        collectionUser.push(users)
    })
    return collectionUser
}

export const get = async (id, table) => {
    const result = await db.collection(table).doc(id).get()
    let user = {id: result.id, data: result.data()}
    return user
}

export const getByParameter = async (table, mail, field) => {
    const result = await db.collection(table).where(field, '==', mail).get()
    let collectionUser = []
    result.forEach(docs => {
        collectionUser.push(docs.data())
    })
    if(collectionUser.length !== 0) {
        return true
    }
    return false
}

export const create = async (table, data) => {
    const result = await db.collection(table).add(data)
    const dataResponse = await result.get()
    return { id: dataResponse.id, data: dataResponse.data() }
}

export const remove = async (id, table) => {
    const result = await db.collection(table).doc(id).delete()
    return result
}

export const update = async (id, table, data) => {
    const result = await db.collection(table).doc(id).update(data)
    return result
}