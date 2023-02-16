import DbConnection from "../../lib/db"
import logger from "../../lib/logger";
import Publication from "../entitys/publication.entity"
import IPublication from '../interfaces/publication.interface';
import IResponse from "../interfaces/response.interface";
import IUser from '../interfaces/user.interface';

export default class PublicationController {
    private dbConnection: DbConnection
    private publicationRepository: any

    constructor() {
        this.dbConnection = DbConnection.instance
        this.publicationRepository = this.dbConnection.appDataSource.getRepository(Publication)
    }

    createPublication( publication: IPublication, user: IUser): Promise<IResponse> {
        return new Promise(async(resolve, reject) => {
            try {
                publication.creatorId = Number(user.id)
                publication.creatorName = user.name
                publication.creatorRole = user.role
                
                const pubCreated = await this.publicationRepository.save(publication)
                logger.info(`Publicacion creada con exito: ${publication.title}`)
                return resolve({ok: true, message: 'Publicacion creada con exito', response: pubCreated, code: 201 })
            } catch(e) {
                return reject({ ok: false, message: 'Error al tratar de crear publicacion', response: e, code: 500})
            }
        })
    }

    getPublications(): Promise<IResponse> {
        return new Promise(async(resolve, reject) => {
            try {
                const pubFinded = await this.publicationRepository.find({})

                if ( pubFinded.length < 1 ) {
                    return reject({ ok: false, message: 'No existen publicaciones', response: null, code: 404 })
                }

                return resolve({ ok: true, message: 'Publicaciones recuperadas con exito!', response: pubFinded, code: 200 })
            } catch(e) {
                return reject({ ok: false, message: 'Ocurrio un error', response: e, code: 500 })
            }
        })
    }

    updatePublication(publication: IPublication): Promise<IResponse> {
        return new Promise(async(resolve, reject) => {
            try {
                const updatePub = await this.publicationRepository.update(
                    { id: publication.id },
                    { title: publication.title, description: publication.description }
                )
    
                if (updatePub.affected == 0) {
                    reject({ ok: false, message: 'Ocurrio un error al actualizar publicacion', response: null, code: 400 })
                }
    
                return resolve({ ok: true, message: 'Publicacion actualizada con exito', response: updatePub, code: 200 })
            } catch(e) {
                reject({ ok: false, message: 'Ocurrio un error al actualizar', response: null, code: 500 })
            }
        })
    }

    deletePublication(pubId: number ): Promise<IResponse> {
        return new Promise(async(resolve, reject) => {
            try {
                const deletePub = await this.publicationRepository.delete({ id: pubId })

                if( deletePub.affected < 1 ) {
                    reject({ ok: false, message: 'Ocurrio un error al eliminar publicacion', response: null, code: 400 })
                }
                return resolve({ ok: true, message: 'Publicacion eliminada con exito', response: deletePub, code: 200 })
            }catch (e) {
                reject({ ok: false, message: 'Ocurrio un error', response: null, code: 500 })
            }
        })
    }
}