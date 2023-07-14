'use client';
import Image from 'next/image';
import { useState, SyntheticEvent } from 'react';

interface FormData {
  prompt: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageAI, setImageAI] = useState('');
  const [error, setError] = useState(false);

  const api = '/api/generate';
  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(false);
    const { prompt } = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as unknown as FormData;
    const promptTrimed = prompt.trim()
    if (!promptTrimed) {
      setError(true);
      return;
    }

    setIsLoading(true);
    const res = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: promptTrimed }),
    });
    const data = await res.json();
    if (data?.url) {
      setIsLoading(false);
      setImageAI(data.url);
      console.log(data);
    }
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="flex justify-center w-300 border-4 border-gray-600 rounded-md">
      <form onSubmit={handleForm} className="flex flex-col bg-white rounded-md shadow-lg p-6 gap-y-3">
        <div className="flex">
          <input type="text" placeholder="Write your prompt" className="border border-gray-300 px-3 py-2 rounded-tl-md rounded-bl-md w-full" name="prompt" />
          <button className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 focus:outline-none rounded-tr-md rounded-br-md">
            Generate
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>Write something</p>}
        {isLoading && 'Loading...'}
        {imageAI ? <Image className="rounded-md w-full h-150" src={imageAI} alt="aiImage" width={350} height={350} /> : <div></div>}
      </form>
    </main>
  );
}
