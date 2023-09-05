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
    res.json(currentTime)
});

app.get('/api/:date', (req: Request, res: Response) => {

    if(req.params.date) { 

       // async .every method
       const allInts = Array.from(req.params.date.trim()).every(item => {
        const isInt = !isNaN(parseInt(item));
        return isInt;
      });

        const date =  allInts ? new Date(parseInt(req.params.date)) :  new Date(`"${req.params.date}"`)  
        const utc = date.toUTCString()
        const unix = date.getTime()       
        console.log(`
            {
                allInts: ${allInts},
                type: ${typeof req.params.date},
                stringDate: ${new Date(`"${req.params.date}"`)  }
                req.params.date: ${req.params.date},
                date: ${date},
                unix: ${unix},
                utc: ${utc}
            }
        `)
        res.json({
            unix: unix,
            utc: utc
        })
    
    }
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});