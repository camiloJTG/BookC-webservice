import multer from 'multer'
import { join, extname } from 'path'
import { v4 } from 'uuid'

const store = multer.diskStorage({
    destination: join(__dirname, '../public/images'),
    filename: (req, file, cb, filename) => {
        cb(null, `${v4()}${extname(file.originalname)}`)
    }
})

export const multerFile = () => {
    return multer({
        storage: store
    }).single('image')
}