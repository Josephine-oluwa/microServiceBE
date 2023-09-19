import express, { Application, Request, Response } from "express"
import ejs from "ejs"
import cors from "cors"
import auth from "./Router/AuthRouter"

const app: Application = express()
const port: number = 3344;


app.set("view engine", "ejs");
app.use(cors())
app.use(express.json())

app.use("/api", auth)

app.get("/", (req: Request, res: Response) => {
try {
    return res.status(200).json({
        message: "Awesome"

    })
} catch (error) {
    return res.status(404).json({
        message: "error"
    })
}
})

app.listen(port, ()=> {
    console.log()
    console.log("auth services connected")
})