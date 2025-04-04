import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import dalleRoutes from './routes/dalle.routes.js' ;

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: "50mb"}))

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.status(200).json({message: " Hello from Dall.E"})
})

app.listen(8080, () => console.log('Server started in port 8080'))