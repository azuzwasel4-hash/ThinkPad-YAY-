
import React from 'react';
import { MOCK_FORUM_POSTS } from '../constants';

const Forum: React.FC = () => {
  const categories = [
    { name: 'General', icon: 'fa-comments', color: 'bg-blue-500' },
    { name: 'Troubleshooting', icon: 'fa-wrench', color: 'bg-red-500' },
    { name: 'Modding', icon: 'fa-microchip', color: 'bg-green-500' },
    { name: 'Popular', icon: 'fa-fire', color: 'bg-orange-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Enthusiast Forums</h1>
          <p className="text-gray-500">The collective knowledge of a thousand trackpoints.</p>
        </div>
        <button className="bg-black text-white px-6 py-2.5 rounded font-bold hover:bg-[#e2231a] transition-all">
          New Thread
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          {categories.map(cat => (
            <button key={cat.name} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:border-black transition-all group">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${cat.color} text-white rounded flex items-center justify-center text-xs`}>
                  <i className={`fas ${cat.icon}`}></i>
                </div>
                <span className="font-semibold group-hover:text-black">{cat.name}</span>
              </div>
              <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
            </button>
          ))}
          
          <div className="mt-8 p-6 bg-gradient-to-br from-black to-gray-800 text-white rounded-xl">
             <h4 className="font-bold mb-2">ThinkPad Guru</h4>
             <p className="text-xs text-gray-400 mb-4 leading-relaxed">
               Need instant hardware help? Use our AI assistant at the bottom right of the screen.
             </p>
             <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#e2231a] w-3/4"></div>
             </div>
          </div>
        </div>

        {/* Thread List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-gray-100 p-2 rounded flex gap-4 mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
            <button className="px-4 py-1 rounded bg-white text-black shadow-sm">Latest</button>
            <button className="px-4 py-1 rounded hover:text-black">Unanswered</button>
            <button className="px-4 py-1 rounded hover:text-black">Trending</button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl divide-y">
            {MOCK_FORUM_POSTS.map(post => (
              <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 uppercase">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">• Posted by {post.author}</span>
                  </div>
                  <span className="text-xs text-gray-400">{post.timestamp}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-blue-600 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1 mb-4">{post.preview}</p>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1.5">
                    <i className="far fa-comment"></i>
                    <span>{post.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <i className="far fa-eye"></i>
                    <span>{(post.replies * 4.5).toFixed(0)} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
