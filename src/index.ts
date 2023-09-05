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
        console.log(currentTime);
});

app.get('/api/:date', (req: Request, res: Response) => {


    
    if(req.params.date) {
      try {
        const date = new Date(req.params.date)
        const utc = date.toUTCString()
        const unix = date.getTime()
        res.send({unix, utc})
      }
      catch {
        res.send({error: "Invalid Date"})
      }
    }
});



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});