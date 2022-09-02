import dotenv from 'dotenv';
import express from "express";
import parcelsRouters from "./routers/routeres.js"
dotenv.config({ path: './.env' });


const app = express();
const Port = process.env.PORT;
//midleware
app.use(express.json());
app.use('/api', parcelsRouters)

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})


app.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
})