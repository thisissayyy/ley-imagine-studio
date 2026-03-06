import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const response = await client.images.generate({
    model: 'grok-imagine-image',
    prompt: prompt,
    n: 2,                    // 2 images per generation
    response_format: 'url',
  });

  const imageUrls = response.data.map(img => img.url!);

  return NextResponse.json({ images: imageUrls });
}