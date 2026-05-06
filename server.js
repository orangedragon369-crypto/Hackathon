import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let events = [];

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.post("/api/events", (req, res) => {
  events.push(req.body);
  res.json({ ok: true });
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});