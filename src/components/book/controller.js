import { get, getByParameter, create, remove, update } from '../../database/firebase/store'
import { uploadFile, deleteFile } from '../../utils/cloudinary'
import { unlink } from 'fs-extra'

const TABLE = 'books'

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
    if(!img) {
        return { info: 'The data model is not correct. Please review the API documentation', status: 422 }
    }
    if(!book.title || !book.author || !book.editorial || !book.numberPage || !book.synopsis || !book.rating || !book.startReading || !book.endReading || !book.userId) {
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
        localPathImg: img.path,
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
        return { info: 'Book deleted', status: 200 }
    }
    return { info: 'Book not found', status: 404 }
}

export const updateBook = async (id, book, img) => {
    // Validate if id exists
    if(!id.id) {
        if(img) {
            await unlink(img.path)
        }
        return { info: 'The book id was not found in the database', status: 404 }
    }

    // Get the current book data
    const currentBook = await get(id.id, TABLE)
    if(!currentBook.data) {
        if(img) {
            await unlink(img.path)
        }
        return { info: 'The book you want to update is not in the database', status: 404 }
    }

    // Update images
    if(img) {        
        // Delete old image
        await deleteFile(currentBook.data.remotePublicId)
        await unlink(currentBook.data.localPathimg)
    
        // Upload new image
        const uploadNewImage = await uploadFile(img.path)
        book = { ...book, remotePublicId: uploadNewImage.public_id, localPathImg: img.path, image: uploadNewImage.secure_url }
    }
    
    // Update field 
    if(book.title || book.author || book.editorial || book.numberPage || book.synopsis || book.rating || book.startReading || book.endReading || book.userId || img) {
        book = {...book, updatedAt: Date.now()}
        await update(id.id, TABLE, book)
        return { info: 'Book Updated', status: 200 }
    }
    return { info: 'Not data book', status: 422 }
}