"use client"

import { useState, ChangeEvent, FormEvent } from 'react';

interface Photo {
  id: number;
  pageURL: string;
  largeImageURL: string;
  tags: string;
}

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Photo[]>([]);

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    search();
  }

  const search = async () => {
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API}&q=${searchKeyword}&image_type=photo`);
    const photoSearchResult = await response.json();
    setSearchResult(photoSearchResult.hits);
  }

  return (
    <div className="photo-search-area p-4 md:p-8">
      <div className="photo-search-form mb-4 flex flex-col md:flex-row items-center">
        <h1 className="text-xl font-bold mb-2 md:mr-4">画像を検索</h1>
        <input
          type="text"
          placeholder="キーワードを入力"
          value={searchKeyword}
          onChange={handleSearchKeyword}
          className="border border-gray-300 px-2 py-1 rounded mb-2 md:mb-0 md:mr-2"
        />
        <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          検索
        </button>
      </div>
      <div className="photo-disp grid grid-cols-1 md:grid-cols-3 gap-4">
        {searchResult.map((result) => (
          <div key={result.id} className="photo">
            <a href={result.pageURL} target="_blank" rel="noopener noreferrer">
              <img src={result.largeImageURL} alt={result.tags} className="w-full h-auto" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}