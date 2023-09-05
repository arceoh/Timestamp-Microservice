import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


app.get('/api/', (req: Request, res: Response) => {
    const currentTime = {
        unix: Date.now(),
        utc: new Date().toUTCString()
    }
    res.send(currentTime)
});

app.get('/api/:date', (req: Request, res: Response) => {

    if(req.params.date) { 

    
        // let allInts =   req.params.date.trim().split('').every(item => parseInt(item)) // Check if all characters are integers


       // async .every method
        const allInts =  req.params.date.trim().split('').every(async item => {
            const isInt = await parseInt(item)
            return isInt
        }) // Check if all characters are integers

        const date = allInts ? new Date(parseInt(req.params.date)) :  new Date(`${req.params.date}`)  
        const utc = date.toUTCString()
        const unix = date.getTime()       
        res.send({
            unix: unix,
            utc: utc
        })
    
    }
});





app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});