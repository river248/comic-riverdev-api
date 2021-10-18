import { ComicService } from '../services/comic.service'
import { HttpStatusCode } from '../utilities/constants'

const createNew = async (req, res) => {
    try {
        const result = await ComicService.createNew(req.body)

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await ComicService.update(id, req.body)

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

export const ComicController = {
    createNew,
    update
}