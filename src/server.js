import express from 'express'
import cors from 'cors'
// import { corsOptions } from './config/cors'
import { connectDB } from './config/mongodb'
import { env } from './config/enviroment'
import { apiV1 } from './routes/v1'

connectDB()
    .then(() => console.log('Connected successfully to database server!'))
    .then(() => bootServer())
    .catch(error => {
        console.error(error)
        process.exit(1)
    })

const bootServer = () => {

    const app = express()

    // app.use(cors(corsOptions))
    app.use(
        cors({
            credentials: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            origin: process.env.NODE_ENV === 'production' ? 'https://comic-riverdev-web.web.app' : 'http://localhost:8080'
        })
    )

    // Enable req.body data
    app.use(express.json())

    app.use(express.urlencoded({ extended: true }))
    // Use APIs v1
    app.use('/v1', apiV1)

    app.listen(env.APP_PORT || process.env.PORT, () => {
        console.log(`Hello river, I'm running at port: ${process.env.PORT}/`)
    })
}