//Criar a API escutar e reportar e gerenciar todo o app
//nodemon atualiza o sistema toda vez que vc adiciona um novo arquivo
//parei no minuto 09:21

import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';
//Import Routes
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';


config();
connectDB();

const app = express();

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);


//req: request, res: response

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

process.on("unhandledRejection", async (err) => { //Se alguma Promise falhar e ninguém cuidar disso, para tudo com segurança
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => { //Erro grave no código → encerra o app na hora.
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => { //Aviso de desligamento → fecha tudo com educação.
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
