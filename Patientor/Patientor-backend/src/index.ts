import express from 'express';
import diagnosesRouter from './routes/diagnosesRoutes';
import patientRouter from './routes/patientRouter';
import cors from 'cors';

const app = express();
app.use(express.json());
const PORT = 3001;
app.use(cors());

app.get('/ping', (_req,res)=>{
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT,()=>{
 console.log(`server running on port ${PORT}`); 
});
