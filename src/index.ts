import dotenv from 'dotenv'
import OpenAI from 'openai'
import app from './app'
import { Request, Response } from 'express'
import z from 'zod'
dotenv.config()

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

app.post('/generate', async (req: Request, res: Response) => {


  async function generateText(text: string) {
    const completation = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_completion_tokens: 150,
      temperature: 0.9,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: "developer",
          content: `
Você é um gerador de piadas.
Responda **apenas** com JSON válido.
Use exatamente este formato (sem acentos nos nomes das chaves):

{
  "piadas": [
    { "genero": "string", "piada": "string" },
    { "genero": "string", "piada": "string" },
    { "genero": "string", "piada": "string" }
  ]
}

Não adicione texto fora do JSON. Certifique-se de fechar a chave final.
`
        },
        {
          role: 'user',
          content: text
        },
      ]
    })

    let rawContent = completation.choices[0].message.content ?? ""

    const jsonMatch = rawContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Nenhum JSON encontrado na resposta do modelo")
    }

    let jsonString = jsonMatch[0].trim()

    if (!jsonString.endsWith('}')) {
      jsonString += '}'
    }

    const output = JSON.parse(jsonString ?? "")

    const schema = z.object({
      piadas: z.array(z.object({
        genero: z.string(),
        piada: z.string()
      }))
    })

    const result = schema.safeParse(output)

    if (result.error) {
      console.log(result)
      throw new Error("Erro ao formatar JSON")
    }

    console.log(result.data)
    return result.data
  }

  const response = (await generateText(req.body.text))

  res.status(200)
  res.json(response)

})

app.listen(3000, () => {
  console.log('Server running at 3000 port')
})



