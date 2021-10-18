import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '../config/mongodb'
// Define Tag collection
const tagCollectionName = 'tags'
const tagCollectionSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).trim(),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await tagCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(tagCollectionName).insertOne(value)
        return result

    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {

        const result = await getDB().collection(tagCollectionName).findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: data },
            { returnOriginal: false }
        )
        return result

    } catch (error) {
        throw new Error(error)
    }
}

export const TagModel = {
    createNew,
    update
}