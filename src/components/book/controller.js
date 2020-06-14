import store from '../../database/firebase/store'
import {unlink } from 'fs-extra'

const TABLE = 'books'

export const createBook = async (book, img) => {
    if(!book.title || !book.author || !book.editorial || !book.numberPage || !book.sinopsis || !book.rating || !book.startReading || !book.endReading || !book.image) {
        await unlink(img.path)
        return { info: 'The data model is not correct. Please review the API documentation', status: 422}
    }
}