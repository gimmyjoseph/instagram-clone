

import React from 'react'
import Header from './Header';
import Stories from './Stories';
import Posts from './Posts';
import Suggestions from './Suggestions';
import Footer from './Footer';



export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header/>
      <main className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 pt-20 px-4">
        <div className="md:w-2/3">
          {/* <Stories/> */}
          <Posts/>
        </div>
        <div className="md:w-1/3 hidden md:block">
          {/* <Suggestions/> */}
        </div>
      </main>
      {/* <Footer/> */}
    </div>
  );
}