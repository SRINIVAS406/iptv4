import express from 'express'
import connectDB from './db/connectdb.js'
import web from './routes/web.js'
import session from 'express-session'
import TreeNodeController from './TreeFormRouter/TreeFormRoutes.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const app = express()
const port = process.env.PORT || '3000'
//const dbName= 'blogdb';
//const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017"
//const DATABASE_URL = "mongodb+srv://srdec81:<password>@joinpath-cluster.ksxhe.mongodb.net/test";
//Database connection
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB()

//Set Template Enginer
app.set('views', [path.join(__dirname, 'views'),path.join(__dirname, 'views/TreeNodes/'),path.join(__dirname, 'views/HighChartReport/'),path.join(__dirname, 'views/BoothFactInfluencer/')]);
app.set('view engine', 'ejs')


app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'views')));

app.use(session({
    secret:'myproduct-key',
    resave: true,
        saveUninitialized: true,
        
}));

// cookie: {
//     expires:60000
// }
//Load Routes
app.use('/', web)
app.use('/', TreeNodeController)

app.listen(port,()=>{
    console.log('Server listening at http://localhost:${port}')
})