import { v2 } from 'cloudinary'

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

export const uploadFile = async file => {
    const result = await v2.uploader.upload(file, {
        folder: 'BookC/Books'
    })
    return result
}

export const deleteFile = async publicId => {
    const result = await v2.api.delete_resources(publicId)
    return result
}