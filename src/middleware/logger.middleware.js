import winston from "winston";

const customLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
}

const logger = winston.createLogger({
    levels: customLevels,
    transports: [
        new winston.transports.Console({
            level: process.env.ENVIROMENT === 'development' ? 'debug' : 'info'
        }),
        new winston.transports.File({
            filename: './src/errors.log',
            level: 'error'
        })
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    next()
}