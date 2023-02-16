import { Request, Response, Router } from 'express'
import UserController from '../controllers/user.controller';
import IUser from '../interfaces/user.interface';


const userRoutes = Router()
const userCtr = new UserController

userRoutes.post('/create', async(req: Request, res: Response) => {
    const user: IUser = req.body

    try {
        const response = await userCtr.createUser(user)
        return res.status(response.code).json(response)
    } catch (e: any) {
        return res.status(e.code ? e.code : 500).json(e)
    }
})

userRoutes.post('/login', async(req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const response = await userCtr.loginUser(email, password)
        return res.status(response.code).json(response)
    } catch(e: any) {
        return res.status(e.code ? e.code : 500).json(e)
    }
})

export default userRoutes