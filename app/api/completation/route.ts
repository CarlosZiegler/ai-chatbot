import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { z } from 'zod'
import { zValidateReq } from '@/lib/validate'
import { envs } from '@/constants/envs'

export const runtime = 'edge'

const schema = z.object({
  id: z.string().optional(),
  messages: z.array(
    z.object({
      content: z.string(),
      role: z.enum(['user', 'assistant', 'system']),
      name: z.string().optional()
    })
  ),
  previewToken: z.string().nullable().optional(),
  model: z.object({
    id: z.string()
  })
})

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const { messages, model } = await zValidateReq(schema, req)

  const res = await openai.createChatCompletion({
    model: model.id || 'gpt-3.5-turbo',
    messages,
    temperature: 0.5,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}
