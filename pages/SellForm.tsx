
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

const SellForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    model: '',
    series: 'T Series',
    processorType: 'Intel i7',
    gpuType: 'Integrated Graphics',
    storage: '',
    condition: 'Excellent',
    price: ''
  });

  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Correctly cast the resulting array to File[] to match processFiles signature
      const newFiles = Array.from(e.target.files) as File[];
      processFiles(newFiles);
    }
  };

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      // Correctly cast the resulting array to File[] to match processFiles signature
      processFiles(Array.from(e.dataTransfer.files) as File[]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one photo of your ThinkPad.");
      return;
    }
    alert(`Listing submitted! Your ${formData.model} with ${images.length} photos is being verified.`);
    navigate('/used');
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-gray-300 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-block p-3 bg-[#e2231a]/10 border border-[#e2231a]/30 rounded-full mb-4">
            <i className="fas fa-plus text-[#e2231a] text-2xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tighter mb-2">List Your ThinkPad</h1>
          <p className="text-gray-500">Provide the technical specs and photos for our enthusiast community.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-gray-800 p-8 rounded-xl shadow-2xl space-y-8">
          
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Hardware Gallery (Min 1 Photo)</label>
            
            <div 
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
                isDragging ? 'border-[#e2231a] bg-[#e2231a]/5' : 'border-gray-800 hover:border-gray-600 bg-black'
              }`}
            >
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageChange}
              />
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 group-hover:text-white">
                <i className="fas fa-camera text-2xl"></i>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">Click or drag photos here</p>
                <p className="text-xs text-gray-500 mt-1 font-mono">JPG, PNG or WEBP (MAX 5MB per file)</p>
              </div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in duration-300">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-800">
                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                      className="absolute top-1 right-1 bg-black/80 hover:bg-[#e2231a] text-white w-6 h-6 rounded-full flex items-center justify-center transition-colors text-[10px]"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    {idx === 0 && (
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-center font-bold uppercase py-1 text-white">
                        Cover Photo
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
            {/* Model Name */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Laptop Model & Kind</label>
              <input 
                required
                type="text" 
                placeholder="e.g. T480s, X1 Extreme G4"
                className="w-full bg-black border border-gray-800 p-3 rounded font-mono text-sm focus:border-[#e2231a] outline-none transition-all text-white"
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
              />
            </div>

            {/* Series */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Series Kind</label>
              <select 
                className="w-full bg-black border border-gray-800 p-3 rounded font-mono text-sm focus:border-[#e2231a] outline-none transition-all text-white"
                value={formData.series}
                onChange={e => setFormData({...formData, series: e.target.value})}
              >
                <option>T Series</option>
                <option>X Series</option>
                <option>P Series</option>
                <option>L Series</option>
                <option>E Series</option>
                <option>Classic (IBM Era)</option>
              </select>
            </div>

            {/* Processor */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Processor Model</label>
              <select 
                className="w-full bg-black border border-gray-800 p-3 rounded font-mono text-sm focus:border-[#e2231a] outline-none transition-all text-white"
                value={formData.processorType}
                onChange={e => setFormData({...formData, processorType: e.target.value})}
              >
                <optgroup label="Intel">
                  <option>Intel Core i5</option>
                  <option>Intel Core i7</option>
                  <option>Intel Core i9</option>
                  <option>Intel Core Ultra 7</option>
                  <option>Intel Xeon</option>
                </optgroup>
                <optgroup label="AMD">
                  <option>AMD Ryzen 5</option>
                  <option>AMD Ryzen 7</option>
                  <option>AMD Ryzen 9</option>
                </optgroup>
              </select>
            </div>

            {/* GPU */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">GPU / Graphics Card</label>
              <select 
                className="w-full bg-black border border-gray-800 p-3 rounded font-mono text-sm focus:border-[#e2231a] outline-none transition-all text-white"
                value={formData.gpuType}
                onChange={e => setFormData({...formData, gpuType: e.target.value})}
              >
                <option>Integrated Graphics</option>
                <optgroup label="NVIDIA (Workstation)">
                  <option>NVIDIA RTX A2000</option>
                  <option>NVIDIA RTX 3000 ADA</option>
                  <option>NVIDIA Quadro T1000</option>
                  <option>NVIDIA GeForce RTX 4060</option>
                </optgroup>
                <optgroup label="AMD">
                  <option>Radeon Pro W6600M</option>
                  <option>Integrated Radeon Graphics</option>
                </optgroup>
              </select>
            </div>

            {/* Storage */}
            <div className="col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Harddisk / Storage</label>
              <input 
                required
                type="text" 
                placeholder="e.g. 512GB NVMe, 1TB SSD"
                className="w-full bg-black border border-gray-800 p-3 rounded font-mono text-sm focus:border-[#e2231a] outline-none transition-all text-white"
                value={formData.storage}
                onChange={e => setFormData({...formData, storage: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row gap-4">
             <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Asking Price ($)</label>
                <input 
                  required
                  type="number" 
                  placeholder="250"
                  className="w-full bg-black border border-gray-800 p-3 rounded font-mono text-sm focus:border-[#e2231a] outline-none transition-all text-white"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
             </div>
             <button 
               type="submit"
               className="flex-[2] bg-[#e2231a] hover:bg-red-700 text-white font-bold py-3 px-8 rounded uppercase tracking-[0.2em] text-sm transition-all shadow-[0_0_20px_rgba(226,35,26,0.2)]"
             >
               Finalize Listing
             </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-gray-600 font-mono">
          Note: All listings are subject to community verification for authenticity and condition accuracy.
        </p>
      </div>
    </div>
  );
};

export default SellForm;