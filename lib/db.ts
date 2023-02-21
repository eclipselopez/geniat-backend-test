import config from 'config'
import { DataSource } from 'typeorm'
import logger from './logger';
import User from '../src/entitys/user.entity';
import Publication from '../src/entitys/publication.entity';

export default class DbConnection {
    public appDataSource: DataSource
    private static _instance: DbConnection

    constructor() {
        const type: any = config.get("db.type")
        const password: string = (config.has("db.password")) ? config.get("db.password") : ''
        const database: string = (config.has("db.database")) ? config.get("db.database") : 'test'

        this.appDataSource = new DataSource({
            type: type,
            host: config.get("db.host"),
            port: config.get("db.port"),
            username: config.get("db.username"),
            password: password,
            database: database,
            entities: [User, Publication],
            synchronize: config.get("db.synchronize"),
            logging: config.get("db.logging")
        })

        this.connectDB()
    }

    public static get instance() {
        return this._instance || ( this._instance = new this())
    }

    private async connectDB() {
        try {
            await this.appDataSource.initialize()
            logger.info(`Conectado a la base de datos: ${config.get("db.database")}`)
        } catch (e) {
            logger.error(e)
        }
    }
}