import http from 'http'
import express from 'express'
import config from 'config'
import logger from '../../lib/logger';
import DbConnection from '../../lib/db';

export default class Server {
    private port: number
    private httpServer: http.Server
    public app: express.Application
    private static _instance: Server
    private dbConnection: DbConnection

    constructor() {
        this.port = config.get("api.port")
        this.app = express()
        this.httpServer = new http.Server(this.app)
        this.dbConnection = DbConnection.instance
    }

    public static get instance() {
        return this._instance || ( this._instance = new this())
    }

    public start() {
        try{
            this.httpServer.listen(this.port)
            logger.info(`Servidor escuchando en puerto: ${this.port}`)
        }catch(e) {
            logger.error(e)
        }
    }
}