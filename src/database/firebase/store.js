import db from './connection'

export async function read(table) {
    const result = await db.collection(table).get()
    let collectionUser = []
    result.forEach(docs => {
        collectionUser.push(docs.data())
    })
    return collectionUser
}

export async function get(id, table) {
    const result = await db.collection(table).doc(id).get()
    return result.data()
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
    return dataResponse.data()
}

export async function remove(id, table) {
    const result = await db.collection(table).doc(id).delete()
    return result
}

export async function update(id, table, data) {
    const result = await db.collection(table).doc(id).set(data)
    return result
}