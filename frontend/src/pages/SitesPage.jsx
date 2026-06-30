import React, { useState } from 'react';
import { ChevronRight, Layers, Camera } from 'lucide-react';
import { sitesData } from '../data/sitesData';

const SitesPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Dynamically merge all individual photo arrays from every single site into one master collection
  const combinedGallery = sitesData.reduce((acc, site) => {
    if (site.gallery && Array.isArray(site.gallery)) {
      // Add the site name context to each photo so viewers know where it belongs
      const sitePhotos = site.gallery.map(img => ({
        ...img,
        siteName: site.name,
        siteId: site.id
      }));
      return [...acc, ...sitePhotos];
    }
    return acc;
  }, []);

  // Filter the combined master gallery based on user choice
  const filteredGallery = activeTab === 'all'
    ? combinedGallery
    : combinedGallery.filter(img => img.tag === activeTab);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 relative overflow-hidden text-stone-900 selection:bg-amber-200 antialiased">
      {/* Dynamic background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1c1917 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">

        {/* HERO TITLE SECTION */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">Discover Places</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4 tracking-tight">Heritage Sites</h1>
          <p className="text-xl text-gray-600">Explore Pakistan's ancient civilizations through AI-powered historical guides.</p>
        </div>

        {/* NEW BEAUTIFUL EDITORIAL SECTION */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">A Journey Through Time</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 font-sans">
                Where Ancient Paths and Stories Meet
              </h2>
              <p className="text-stone-700 text-lg leading-relaxed text-justify font-serif">
                Pakistan is home to an extraordinary collection of historical treasures that bridge thousands of years of human history. From the perfectly planned streets of Bronze Age cities like Mohenjo-daro and Harappa to the peaceful stone monasteries of Taxila, these landscapes tell stories of incredible creativity, learning, and cultural exchange. Here, the art and ideas of ancient Greece, Persia, Central Asia, and local kingdoms mixed naturally to create timeless traditions. Each site stands as a beautiful reminder of our shared past, preserving deep human history for every generation to explore and find inspiration in.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 shadow-md">
                <img
                  src="https://i.pinimg.com/1200x/31/47/89/3147891cb1b0e977c8f4f5878ab1baa2.jpg"
                  alt="Ancient stone pillars landscape"
                  className="w-full h-full object-cover filter contrast-[101%] sepia-[2%]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SITE LISTING SELECTION CARDS (THE 6 SITES) */}
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span> Select a Destination
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {sitesData.map(site => (
              <div
                key={site.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/60 group flex flex-col justify-between"
                onClick={() => setCurrentPage(`site-${site.id}`)}
              >
                <div>
                  <div className="h-64 bg-gray-100 overflow-hidden relative">
                    <img src={site.image} alt={site.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-orange-100">
                      {site.era}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-amber-600 transition-colors mb-2">{site.name}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{site.description}</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> Photos & Video Ready
                  </span>
                  <button className="text-amber-600 font-bold flex items-center space-x-1 hover:text-amber-700 text-sm transition-transform group-hover:translate-x-0.5">
                    <span>Explore Site</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
          ))}
          </div>
        </div>

        {/* COMBINED MEDIA GALLERY */}
        {combinedGallery.length > 0 && (
          <div className="border-t border-stone-200 pt-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-4 h-4" /> All Site Photos
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">Gallery</h2>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-semibold">
                {['all', 'architecture', 'artifacts', 'landscapes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md capitalize transition ${activeTab === tab ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Combined Masonry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((img, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl overflow-hidden border border-stone-200 aspect-[4/3] shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => setCurrentPage(`site-${img.siteId}`)}
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                    <span className="text-[10px] uppercase font-mono text-amber-400 tracking-wider font-bold mb-0.5">
                      {img.siteName} — {img.tag || 'photo'}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-1">{img.title}</h4>
                    <span className="text-xs text-stone-300 flex items-center gap-0.5">
                      Click to explore full site <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SitesPage;