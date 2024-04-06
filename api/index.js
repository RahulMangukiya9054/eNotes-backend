import notes from './notes'
import user from './user'
import { Router } from "express"

const app = Router();

app.use("/note", notes)
app.use("/user", user)

export default app
