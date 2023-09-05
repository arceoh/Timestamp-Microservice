import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors<Request>({optionsSuccessStatus: 200}));

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


app.use("/api/whoami", (req: Request, res: Response) => {
    console.log(req.headers)
    const ipData = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const ip = ipData ? ipData.toString() : "No IP" 
    const {host, "user-agent": userAgent, "accept-language": language} = req.headers
    const data = {
        "ipaddress": ip.replace("::ffff:", ""),
        "language": language,
        "software":userAgent
    }

    console.log("Data: ", data)
    console.log("Host: ", host)

    res.json(data)
});

app.get('/api/:date', (req: Request, res: Response) => {

    if(req.params.date) { 

       // async .every method
       const allInts = Array.from(req.params.date.trim()).every(item => {
        const isInt = !isNaN(parseInt(item));
        return isInt;
      });

        const date =  allInts ? new Date(parseInt(req.params.date)) :  new Date(`"${req.params.date}"`)  


        if(date.toString() === "Invalid Date") {
            res.json({
                error: "Invalid Date"
            })
        }
      
        const utc = date.toUTCString()
        const unix = date.getTime() 

        console.log(`
            {
                req.params.date: ${req.params.date},
                allInts: ${allInts},
                type: ${typeof req.params.date},
                stringDate: ${new Date(`"${req.params.date}"`)  }
                date: ${date},
                unix: ${unix},
                utc: ${utc}
            }
        `)
        res.json({
            unix,
            utc
        })
    
    }
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


