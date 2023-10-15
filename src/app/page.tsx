"use client"

import { useState } from 'react';

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState();
  const [searchResult, setSearchResult] = useState([]);

  // 検索キーワードをセット
  const handleSearchKeyword = (e: any) => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
  }

  // 画像を取得する
  const handleSubmit = (e: any) => {
    e.preventDefault();
    Search();
    async function Search() {
      const response = await fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API}&q=${searchKeyword}&image_type=photo`)
      const photoSearchResult = await response.json();
      setSearchResult(photoSearchResult.hits);
      console.log(photoSearchResult);

    }
  }

  return (
    <div className="photo-search-area p-8">
      <div className="photo-search-form mb-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <h1 className="text-xl font-bold mr-4">画像を検索</h1>
          <input
            type="text"
            placeholder="キーワードで検索"
            onChange={handleSearchKeyword}
            className="border border-gray-300 px-2 py-1 rounded"
          />
          <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
            検索
          </button>
        </form>
      </div>
      <div className="photo-disp grid grid-cols-1 md:grid-cols-3 gap-4">
        {searchResult.map((result: any) => (
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
