import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/auth.routes.js';
import movieRoutes from "./routes/movieList.routes.js";
import movieshowRoutes from "./routes/movieShow.routes.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("mongodb connected");
})
.catch((err) => {
  console.log(err);
});

//demo
app.get('/api', function (req, res) {
  res.send(" Hello express. Welcome! ");
})

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRoutes);
app.use('/api/movie-list', movieRoutes);
app.use('/api/theater-show', movieshowRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`server is running on port ${process.env.PORT}`)
    console.log("yes")
})