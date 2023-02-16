import DbConnection from '../../lib/db'
import User from '../entitys/user.entity';
import IResponse from '../interfaces/response.interface';
import IUser from '../interfaces/user.interface';
import logger from '../../lib/logger';
import EncryptClass from '../class/encrypt.class';

export default class UserController {
    private encrypt = new EncryptClass
    private dbConnection: DbConnection
    private userRepository: any

    constructor() {
        this.dbConnection = DbConnection.instance
        this.userRepository = this.dbConnection.appDataSource.getRepository(User)
    }

    createUser( userToCreated: IUser ): Promise<IResponse> {
        return new Promise(async(resolve, reject) => {

            try {
                if ( userToCreated.password ) {
                    const { salt, passwordHash } = this.encrypt.genPassword(userToCreated.password)
                    userToCreated.password = passwordHash
                    userToCreated.salt = salt
                } else {
                    return reject({ ok: false, message: 'Datos incompletos', response: null, code: 400 })
                }

                const userCreated = await this.userRepository.save(userToCreated)
                userCreated.password = ''
                userCreated.salt = ''
                logger.info(`Usuario creado con exito: ${userToCreated.email}`)
                return resolve({ok: true, message: 'Usuario creado con exito', response: userCreated, code: 201 })
            } catch(e) {
                return reject({ ok: false, message: 'Error al tratar de crear usuario', response: e, code: 500})
            }
        })
    }

    loginUser( email: string, password: string ): Promise<IResponse> {
        return new Promise(async(resolve, reject) => {
            try {
                if ( email == '') {
                    return reject({ ok: false, message: 'Datos incorrectos', response: null, code: 401 })
                }

                const userFinded = await this.userRepository.findOneBy({ email: email })

                if ( userFinded == null ) {
                    return reject({ ok: false, message: 'El usuario no existe', response: null, code: 404 })
                }

                const { passwordHash } = await this.encrypt.saltHashPassword( password, userFinded.salt )

                if ( passwordHash !== userFinded.password ) {
                    return reject({ ok: false, message: 'Datos incorrectos', response: null, code: 401 })
                }

                delete userFinded.password
                delete userFinded.salt
                const token = await this.encrypt.genToken(userFinded)
                delete userFinded.role

                return resolve({ ok: true, message: 'Usuario logueado con exito', response: userFinded, token: token, code: 200 })
            } catch(e) {
                logger.error(e)
                return reject({ ok: false, message: 'Recuperado', response: e, code: 500 })
            }
        })
    }
}