import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
  res.status(200).json({ 
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
      "name": "Johnson Ogwuru",
      "github": "@ogwurujohnson",
      "email": "ogwurujohnson@gmail.com",
      "mobile": "08081200722",
      "twitter": "@devopsjay"
    }
  })
})

export default app;
