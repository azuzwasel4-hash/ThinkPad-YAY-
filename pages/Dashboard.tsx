
import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { UserFleetItem } from '../types';

const Dashboard: React.FC = () => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'fleet' | 'market' | 'health'>('fleet');

  const fleet: UserFleetItem[] = [
    { id: 'u1', model: 'ThinkPad T480', specs: 'i7-8650U | 32GB | 1TB', status: 'Optimal', estimatedValue: 350 },
    { id: 'u2', model: 'ThinkPad X1 Carbon Gen 6', specs: 'i5-8350U | 16GB | 512GB', status: 'Requires Maintenance', estimatedValue: 280 },
    { id: 'u3', model: 'ThinkPad X230', specs: 'i5-3320M | 16GB | 256GB', status: 'Optimal', estimatedValue: 180 },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-gray-800 pb-12">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-[#111] border-2 border-[#e2231a] rounded-sm flex items-center justify-center relative">
              <i className="fas fa-user-ninja text-4xl text-white"></i>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">ONLINE</div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tighter">ThinkFan_99</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded-sm border border-gray-700">VERIFIED COLLECTOR</span>
                <span className="text-xs text-gray-500 font-mono">Member since: 2018.04.12</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
             <div className="text-center md:text-left">
               <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Fleet Value</div>
               <div className="text-2xl font-mono text-white">$810.00</div>
             </div>
             <div className="text-center md:text-left">
               <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Market Rep</div>
               <div className="text-2xl font-mono text-[#e2231a]">4.9★</div>
             </div>
             <div className="text-center md:text-left col-span-2 md:col-span-1">
               <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Open Listings</div>
               <div className="text-2xl font-mono text-white">2</div>
             </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="space-y-2">
            {[
              { id: 'fleet', label: 'My Hub Fleet', icon: 'fa-laptop' },
              { id: 'market', label: 'Market Pulse', icon: 'fa-chart-area' },
              { id: 'health', label: 'ThinkHealth Scan', icon: 'fa-microchip' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-4 rounded-sm flex items-center gap-4 transition-all border-l-4 ${
                  activeTab === tab.id 
                    ? 'bg-white/5 border-[#e2231a] text-white' 
                    : 'border-transparent hover:bg-white/5 hover:text-white'
                }`}
              >
                <i className={`fas ${tab.icon} w-5`}></i>
                <span className="font-bold uppercase text-xs tracking-widest">{tab.label}</span>
              </button>
            ))}
            
            <div className="mt-8 p-6 bg-[#111] border border-gray-800 rounded-sm">
               <div className="flex items-center gap-2 mb-4 text-[#e2231a]">
                 <i className="fas fa-exclamation-triangle text-xs"></i>
                 <span className="text-[10px] font-bold uppercase tracking-widest">Alerts</span>
               </div>
               <p className="text-xs leading-relaxed mb-4">BIOS Update available for T480. Version 1.52 fixes thermal issues.</p>
               <button className="text-[10px] font-bold text-white border-b border-[#e2231a] hover:text-[#e2231a] transition-colors">FIX NOW</button>
            </div>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'fleet' && (
              <div className="bg-[#111] border border-gray-800 rounded-sm overflow-hidden animate-in fade-in slide-in-from-right-4">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="font-bold text-white uppercase tracking-widest text-sm">Managed Devices</h3>
                  <button className="text-xs bg-white text-black px-3 py-1 font-bold rounded-sm">+ Add Hardware</button>
                </div>
                <div className="divide-y divide-gray-800">
                  {fleet.map(item => (
                    <div key={item.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white/[0.02]">
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-12 h-12 bg-black border border-gray-800 rounded-sm flex items-center justify-center text-[#e2231a]">
                          <i className="fas fa-laptop"></i>
                        </div>
                        <div>
                          <div className="font-bold text-white">{item.model}</div>
                          <div className="text-xs font-mono text-gray-500">{item.specs}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-12 w-full md:w-auto justify-between">
                        <div className="text-center">
                          <div className="text-[10px] text-gray-600 font-bold uppercase mb-1">Status</div>
                          <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'Optimal' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                          }`}>
                            {item.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-gray-600 font-bold uppercase mb-1">Market Value</div>
                          <div className="font-mono text-white">${item.estimatedValue}</div>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-white transition-colors">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                 <div className="bg-gradient-to-br from-[#111] to-black p-8 rounded-sm border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <i className="fas fa-signal text-[#e2231a]"></i>
                      Hub Market Sentiment
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 bg-black border border-gray-800 rounded-sm">
                        <div className="text-gray-500 text-[10px] font-bold uppercase mb-2">Buy Index</div>
                        <div className="text-3xl font-mono text-green-500">STRONG</div>
                        <div className="text-[10px] text-gray-600 mt-1">Focus: T480/T480s</div>
                      </div>
                      <div className="p-4 bg-black border border-gray-800 rounded-sm">
                        <div className="text-gray-500 text-[10px] font-bold uppercase mb-2">Sell Index</div>
                        <div className="text-3xl font-mono text-[#e2231a]">MODERATE</div>
                        <div className="text-[10px] text-gray-600 mt-1">Focus: X1C Gen 6</div>
                      </div>
                      <div className="p-4 bg-black border border-gray-800 rounded-sm">
                        <div className="text-gray-500 text-[10px] font-bold uppercase mb-2">Rare Parts</div>
                        <div className="text-3xl font-mono text-blue-400">HIGH</div>
                        <div className="text-[10px] text-gray-600 mt-1">Focus: 7-Row Keyboards</div>
                      </div>
                    </div>
                 </div>
                 
                 <div className="bg-[#111] border border-gray-800 p-6 rounded-sm">
                   <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-6">Trending in Forum</h4>
                   <div className="space-y-4">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="flex justify-between items-center text-sm">
                         <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Are P-Series workstations worth the weight?</span>
                         <span className="text-xs font-mono text-gray-600">89 replies</span>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="bg-[#111] border border-gray-800 p-12 rounded-sm text-center animate-in fade-in slide-in-from-right-4">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-black border-2 border-[#e2231a] rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-stethoscope text-2xl text-[#e2231a]"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tighter">AI ThinkHealth Diagnostics</h3>
                  <p className="text-gray-500 max-w-md mx-auto">Input your hardware model for a real-time health analysis and recommended mods.</p>
                </div>
                
                <div className="max-w-md mx-auto flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. T480 i7-8650U" 
                    className="flex-1 bg-black border border-gray-800 px-4 py-3 rounded-sm font-mono text-sm outline-none focus:border-[#e2231a] text-white"
                  />
                  <button className="bg-[#e2231a] text-white px-6 font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-red-700">Scan</button>
                </div>
                
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-30 grayscale pointer-events-none">
                  <div className="p-4 border border-gray-800 rounded-sm">
                    <i className="fas fa-microchip mb-2"></i>
                    <div className="text-[8px] font-bold">CPU HEALTH</div>
                  </div>
                  <div className="p-4 border border-gray-800 rounded-sm">
                    <i className="fas fa-fan mb-2"></i>
                    <div className="text-[8px] font-bold">THERMALS</div>
                  </div>
                  <div className="p-4 border border-gray-800 rounded-sm">
                    <i className="fas fa-battery-full mb-2"></i>
                    <div className="text-[8px] font-bold">CYCLES</div>
                  </div>
                  <div className="p-4 border border-gray-800 rounded-sm">
                    <i className="fas fa-bolt mb-2"></i>
                    <div className="text-[8px] font-bold">VOLTAGE</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
