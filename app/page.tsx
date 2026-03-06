'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt) return;
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (data.images) setImages(data.images);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">LeyPrem Imagine Studio</h1>
        <p className="text-center text-xl mb-12 text-gray-400">Powered by Grok Imagine • Instant AI images for your shop</p>

        <div className="bg-zinc-900 rounded-3xl p-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image... e.g. LeyPrem leather bracelet on wrist, golden hour"
            className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-white"
          />
          <button
            onClick={generate}
            disabled={loading}
            className="w-full mt-4 bg-white text-black font-semibold py-4 rounded-2xl hover:bg-gray-200 transition"
          >
            {loading ? 'Generating with Grok...' : 'Generate Images ✨'}
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <img src={url} alt="Generated" className="rounded-3xl w-full" />
              <a href={url} download={`leyprem-${i}.jpg`} className="absolute bottom-4 right-4 bg-white text-black px-6 py-2 rounded-xl font-medium opacity-0 group-hover:opacity-100 transition">
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}