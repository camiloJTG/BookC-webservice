import { read, get, getByParameter, create, remove, update } from '../../database/firebase/store'
import { uploadFile, deleteFile } from '../../utils/cloudinary'
import { unlink } from 'fs-extra'

const TABLE = 'books'

export const readBook = async () => {
    const result = await read(TABLE)
    if(result.length === 0) {
        return { info: 'There are not registered books on the platform', status: 404 }
    }
    return { info: result, status: 200 }
}

export const getByIdBook = async id => {
    const result = await get(id.id, TABLE)
    if(!result) {
        return { info: 'Book not found', status: 404 }
    }
    if(!result.data) {
        return { info: 'Book not found', status: 404 }
    }
    return { info: result, status: 200 }
}

export const getByUserId = async id => {
    const result = await getByParameter(TABLE, id.id, 'userId')
    if(result.length === 0) {
        return { info: 'The user id entered does not have any books currently registered', status: 404 }
    }
    return { info: result, status: 200 }
}

export const createBook = async (book, img) => {
    if(!book.title || !book.author || !book.editorial || !book.numberPage || !book.synopsis || !book.rating || !book.startReading || !book.endReading || !img.path || !book.userId) {
        await unlink(img.path)
        return { info: 'The data model is not correct. Please review the API documentation', status: 422 }
    }

    // Validate format data
    book.numberPage = parseInt(book.numberPage)
    book.rating = parseInt(book.rating)
    
    // Validate if the user id is valid
    const exists = await get(book.userId, 'users')
    if(!exists.data) {
        await unlink(img.path)
        return { info: 'The user id is not registered in the database', status: 404 }
    }
    
    // Upload images in cloudinary
    const uploadImage = await uploadFile(img.path)
    book.image = uploadImage.secure_url

    // Creating book object
    const newBook = {
        ...book,
        remotePublicId: uploadImage.public_id,
        localPathimg: img.path,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }

    // Saved Book
    const result = await create(TABLE, newBook)
    return { info: result, status: 201 }
}

export const deleteBook = async id => {
    const exist = await get(id.id, TABLE)
    if(!exist.data) {
        return { info: 'Book not found', status: 404}
    }
    const result = await remove(id.id, TABLE)
    if(result) { 
        await unlink(exist.data.localPathimg)   
        await deleteFile(exist.data.remotePublicId)
        return { info: 'User deleted', status: 200 }
    }
    return { info: 'User not found', status: 404 }
}

export const updateBook = async (id, book, img) => {
    let newBook = {}
    const bookExist = await get(id.id, TABLE)
    if(!bookExist.data) {
        await unlink(img.path)
        return { info: 'The book id was not found in the database', status: 404 }
    }
    const oldLocalImg = bookExist.data.localPathimg

    // Validate if contain images
    if(img.path) {
        // Delete old image
        await unlink(bookExist.data.localPathimg)
        const uploadImg = await uploadFile(img.path)
        newBook = { remotePublicId: uploadImg.public_id, localPathimg: img.path }
    }

    // Creating book object
    newBook = {
        book
    }
    const result = await update(id.id, TABLE, newBook)

    if(!result) {
        await deleteFile(newBook.remotePublicId)
        await unlink(bookExist.data.localPathimg)
        return { info: 'No data to update', status: 422 }
    }
    
    await deleteFile(oldLocalImg)
    return { info: 'book update', status: 200 }
}