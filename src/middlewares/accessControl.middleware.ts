import {Request, Response, NextFunction} from 'express';

export async function accessControl(req:Request, res: Response, next: NextFunction) {
    const role = req.body.user.role
    const url = req.url.split("?")

    switch(url[0]) {
        case "/getall":
            if ( role == 'basico' ) {
                return res.status(401).json({ok: false, message: 'No tienes acceso'})
            }
            break
        case "/create":
            if ( role == 'basico' || role == 'medio' ) {
                return res.status(401).json({ok: false, message: 'No tienes acceso'})
            }
            break
        case "/update":
            if ( role == 'basico' || role == 'medio' || role == 'medioalto' ) {
                return res.status(401).json({ok: false, message: 'No tienes acceso'})
            }
            break
        case "/delete":
            if ( role !== 'alto' ) {
                return res.status(401).json({ok: false, message: 'No tienes acceso'})
            }
            break
    }

    next()
}