import Server from './class/server.class'
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes';
import pubRoutes from './routes/publication.routes';
import { checkToken } from './middlewares/checkToken.middleware';
import { accessControl } from './middlewares/accessControl.middleware';

const server = Server.instance

server.app.enable('trust proxy')

server.app.use(express.urlencoded({ extended: true }))
server.app.use(express.json({}))

server.app.use(cors({origin: true, credentials: true}))

server.app.use('/api/user', userRoutes)
server.app.use('/api/publication', checkToken, accessControl, pubRoutes)

server.start()