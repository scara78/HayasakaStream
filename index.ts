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
app.get("/", (req, res) => {
  res.send("its ok");
});

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
