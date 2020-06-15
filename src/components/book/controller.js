import { read, get, getByParameter, create } from '../../database/firebase/store'
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
    return { info: result, status: 200 }
}
