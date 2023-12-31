import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/route";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://socialspherex.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
dotenv.config();
app.use(express.json());

app.use("/api/v1", router);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
