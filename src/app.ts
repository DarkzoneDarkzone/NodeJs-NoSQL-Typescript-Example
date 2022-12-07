import express, { Application } from 'express'
import path from 'path'
import { SIO } from './utils/Sockets'
import { socketPort, serverPort } from './utils/config'

// import cors from "cors"
// import cookieParser from 'cookie-parser'
// import morgan from 'morgan'
import { connectDB } from "./utils/database"
import { memberRouter } from './routes/memberRouter'

const app: Application = express()
app.use(express.static(path.join(__dirname, './../dist/public/')))

/*  -------- converting json -------- */  
app.use(express.urlencoded({extended: true}))
app.use(express.json())

/* Middleware */
app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*' )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

//connect to database MongoDB
connectDB()

/** router */
app.use(memberRouter)

/* Socket Start */
const server = app.listen(socketPort)
const io = SIO.init(server)

app.listen(serverPort)