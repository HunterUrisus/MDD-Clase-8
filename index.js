import express from "express";
import morgan from "morgan";
import taskRoutes from "./src/routes/task.routes.js"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", taskRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});