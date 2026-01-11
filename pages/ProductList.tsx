
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { getMarketAnalysis, MarketInsight } from '../services/market';
import { useTranslation } from '../context/LanguageContext';

interface ProductListProps {
  type: ProductType;
  title: string;
  subtitle: string;
}

const ProductList: React.FC<ProductListProps> = ({ type, title, subtitle }) => {
  const { language } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [marketInsight, setMarketInsight] = useState<MarketInsight | null>(null);
  const [isMarketLoading, setIsMarketLoading] = useState(false);
  
  const isMarketplace = type === ProductType.USED || type === ProductType.NEW;
  const isUsedMarket = type === ProductType.USED;

  useEffect(() => {
    if (isMarketplace) {
      const fetchAnalysis = async () => {
        setIsMarketLoading(true);
        const insight = await getMarketAnalysis(language);
        setMarketInsight(insight);
        setIsMarketLoading(false);
      };
      fetchAnalysis();
    }
  }, [type, language]);

  const filtered = MOCK_PRODUCTS.filter(p => 
    p.type === type && 
    (p.name.toLowerCase().includes(search.toLowerCase()) || 
     p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">{title}</h1>
        <p className="text-gray-500">{subtitle}</p>
      </div>

      {isMarketplace && (
        <div className="mb-12 bg-black text-white p-6 rounded-xl border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-chart-line text-8xl"></i>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e2231a] p-2 rounded">
                <i className="fas fa-microchip text-sm"></i>
              </div>
              <h2 className="text-xl font-bold uppercase tracking-widest font-mono">Market Intelligence</h2>
              {isMarketLoading && <i className="fas fa-circle-notch fa-spin text-gray-500 ml-2"></i>}
            </div>

            {isMarketLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            ) : (
              <div>
                <div className="prose prose-invert prose-sm max-w-none text-gray-300 mb-6 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ 
                    __html: marketInsight?.text?.replace(/\n/g, '<br/>') || '' 
                  }} />
                </div>
                
                {marketInsight?.sources && marketInsight.sources.length > 0 && (
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Verified Sources</p>
                    <div className="flex flex-wrap gap-3">
                      {marketInsight.sources.map((source, idx) => (
                        <a 
                          key={idx} 
                          href={source.uri || 'javascript:void(0)'} 
                          target={source.uri ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          className="text-xs bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full text-blue-400 hover:text-white hover:border-blue-500 transition-all flex items-center gap-2"
                        >
                          <i className="fas fa-external-link-alt text-[10px]"></i>
                          {source.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-8">
          {isUsedMarket && (
            <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-xl border border-gray-800 shadow-lg group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[#e2231a]/10 border border-[#e2231a]/30 rounded-full flex items-center justify-center text-[#e2231a]">
                  <i className="fas fa-plus text-lg group-hover:rotate-90 transition-transform duration-300"></i>
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Seller Portal</span>
              </div>
              <h3 className="text-white font-bold mb-2">Selling your laptop?</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">List your ThinkPad in our verified marketplace and reach thousands of enthusiasts.</p>
              <button 
                onClick={() => navigate('/sell')}
                className="w-full py-2.5 bg-[#e2231a] hover:bg-red-700 text-white text-xs font-bold rounded uppercase tracking-widest transition-all shadow-[0_4px_12px_rgba(226,35,26,0.3)]"
              >
                List for Sale
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-2">Search Models</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. T480..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-3">Series</h3>
            <div className="space-y-2">
              {['X1 Carbon', 'T Series', 'P Series', 'X Series', 'L Series'].map(series => (
                <label key={series} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black">
                  <input type="checkbox" className="rounded text-black focus:ring-black" />
                  {series}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-20 text-center">
              <i className="fas fa-laptop text-6xl text-gray-200 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-400">No ThinkPads found...</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
