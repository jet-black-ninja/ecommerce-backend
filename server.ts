import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import createError from 'http-errors';
import * as bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import {routes} from './routes';
import errorMiddleware from './middleware/ErrorMiddleWare';
import {initializeMongoDb} from './configs/mongodb'

//initialize options
const app:Express = express();
dotenv.config();
initializeMongoDb();

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin:function (origin: any, callback: any) {
    if(process.env.CORS_ACCESS?.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error ('Not allowed by cors'))
    }
  },
  methods:["GET", "POST","DELETE","PUT"],
  allowedHeader:[
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma"
  ],
  credentials: true
}
// Middleware to parse incoming JSON requests

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.use(helmet());

//routes
app.use('/',routes);
app.use(function(req:Request, res:Response, next: NextFunction) {
  console.log('failed');
  next(createError(404));
})

app.use(errorMiddleware);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});