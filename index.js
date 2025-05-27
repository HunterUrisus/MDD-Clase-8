import express from "express";
import morgan from "morgan";
import taskRoutes from "./src/routes/task.routes.js";
import { PORT, HOST } from "./src/config/configEnv.js"
import { connectDB } from "./src/config/configDb.js";

async function setupServer() {
  const app = express();
  app.disable("x-powered-by");

  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api", taskRoutes);

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
  });
}

async function setupAPI() {
  try {
    await connectDB();
    await setupServer();
  } catch (error) {
    console.error("Error en index.js -> setupAPI(): ", error);
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) => console.log("Error en index.js -> setupAPI(): ", error));
