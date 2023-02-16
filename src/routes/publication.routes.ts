import { Request, Response, Router } from 'express'
import PublicationController from '../controllers/publication.controller'

const pubRoutes = Router()
const pubCtr = new PublicationController
pubRoutes.get('/getall', async(req: Request, res: Response) => {
    try {
        const response = await pubCtr.getPublications()
        return res.status(response.code).json(response)
    } catch(e: any) {
        return res.status(e.code ? e.code : 500).json(e)
    }
})

pubRoutes.post('/create', async(req: Request, res: Response) => {
    const publication = req.body
    const user = req.body.user

    try {
        const response = await pubCtr.createPublication(publication, user)
        return res.status(response.code).json(response)
    } catch(e: any) {
        return res.status(e.code ? e.code : 500).json(e)
    }
})

pubRoutes.put('/update', async(req: Request, res: Response) => {
    const publication = req.body

    try {
        const response = await pubCtr.updatePublication(publication)
        return res.status(response.code).json(response)
    } catch(e: any) {
        return res.status(e.code ? e.code : 500).json(e)
    }
})

pubRoutes.delete('/delete', async(req: Request, res: Response) => {
    const id = Number(req.query.id)

    try {
        const response = await pubCtr.deletePublication(id)
        return res.status(response.code).json(response)
    } catch(e: any) {
        return res.status(e.code ? e.code : 500).json(e)
    }
})

export default pubRoutes
