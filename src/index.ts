import exp, {Express} from 'express'
import 'dotenv/config'
import beepersController from './controllers/beepersController'


const app: Express = exp()

app.use(exp.json())

app.use('/api/beepers', beepersController)

app.listen(process.env.PORT, () => {
    console.log(`server started on PORT: ${process.env.PORT} visit http://localhost:${process.env.PORT}`);
})
