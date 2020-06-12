import db from './connection'

export async function read(table) {
    const result = await db.collection(table).get()
    let collectionUser = []
    result.forEach(docs => {
        let users = {id: docs.id, data: docs.data()}
        collectionUser.push(users)
    })
    return collectionUser
}

export async function get(id, table) {
    const result = await db.collection(table).doc(id).get()
    let user = {id: result.id, data: result.data()}
    return user
}

export async function getByParameter(table, mail, field) {
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

export async function create(table, data) {
    const result = await db.collection(table).add(data)
    const dataResponse = await result.get()
    return { id: dataResponse.id, data: dataResponse.data() }
}

export async function remove(id, table) {
    const result = await db.collection(table).doc(id).delete()
    return result
}

export async function update(id, table, data) {
    const result = await db.collection(table).doc(id).update(data)
    return result
}