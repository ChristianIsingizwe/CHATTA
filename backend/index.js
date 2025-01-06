import {express } from express
import {dotenv} from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


const port = process.env.APP_PORT || 5000

app.listen(port, ()=>{
    console.log("Successfully connected to the database.")
})