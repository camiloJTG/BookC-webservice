import { db } from './connection'

export const read = async table => {
    const result = await db.collection(table).get()
    let collectionData = []
    result.forEach(docs => {
        let data = {id: docs.id, data: docs.data()}
        collectionData.push(data)
    })
    return collectionData
}

export const get = async (id, table) => {
    const result = await db.collection(table).doc(id).get()
    let user = {id: result.id, data: result.data()}
    return user
}

export const getByParameter = async (table, value, field) => {
    const result = await db.collection(table).where(field, '==', value).get()
    let collectionData = []
    result.forEach(docs => {
        let data = {id: docs.id, data: docs.data()}
        collectionData.push(data)
    })
    return collectionData
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

export const getCredential = async (email, table) => {
    const result = await db.collection(table).where('email', '==', email).get()
    let user
    result.forEach(docs => {
        user = {id: docs.id, data: docs.data()}
    })
    return user
}