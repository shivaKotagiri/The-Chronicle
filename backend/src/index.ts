import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRouter from './routes/user';
import blogRouter from './routes/blog';

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();
app.use('/*',cors());
app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);
app.get("/", async (c) => {
  c.text("Hello Welcome to my Chronicle Blog Backend")
})

export default app
