import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const { prompt } = await request.json();
  if (!prompt) return NextResponse.json({ message: 'Introduce a prompt', status: 400 });
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });
  return NextResponse.json({ url: aiResponse.data.data[0].url });
}
