import express from 'express'
import { Request, Response } from "express";
import { generateProducts } from "./openai";

const app = express()
app.use(express.json())

app.post("/generate", async (req: Request, res: Response) => {
  const { prompt } = req.body;

  try {
    const response = await generateProducts({ prompt });

    res.status(200);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", erro:error  });
  }
});
export default app