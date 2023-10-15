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
    }
  }

  return (
    <div className="photo-search-area">
      <div className="photo-search-form">
        <form onSubmit={handleSubmit}>
          <h1>画像を検索</h1>
          <input type="text" placeholder="キーワードで検索" onChange={handleSearchKeyword}></input>
          <button type="submit">検索</button>
        </form>
      </div>
      <div className="photo-disp">
        {searchResult.map((result: any) => (
          <div key={result.id} className="photo">
            <a href={result.pageURL}>
              <img src={result.largeImageURL}></img>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
