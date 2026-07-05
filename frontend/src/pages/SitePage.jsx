import React, { useState } from 'react';
import { Camera, MapPin, Compass, ChevronLeft, Landmark, ShieldAlert, Play } from 'lucide-react';
import { getSiteById } from '../data/sitesData';

const SitePage = ({ siteId, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const site = getSiteById(siteId);

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Site Not Found</h2>
          <button
            onClick={() => setCurrentPage('sites')}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-lg transition text-sm shadow-sm"
          >
            Back to Sites Directory
          </button>
        </div>
      </div>
    );
  }

  // Generate an automatic backup array to prevent empty fields if a custom layout isn't explicitly configured
  const galleryArchive = site.gallery || [
    { id: 1, tag: 'architecture', title: `${site.name} Structural Profile`, url: site.detailImage || site.image },
    { id: 2, tag: 'landscapes', title: `${site.name} Landscape view`, url: site.image }
  ];

  const filteredGallery = activeTab === 'all' ? galleryArchive : galleryArchive.filter(img => img.tag === activeTab);

  // Converts YouTube links to safe iframe embedded paths automatically
  const getEmbeddableVideoUrl = (url) => {
    if (!url) return "";
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('youtube.com/watch?v=', 'youtube.com/embed/');
    }
    return url;
  };

  const safeVideoUrl = getEmbeddableVideoUrl(site.videoUrl);
  const isYouTube = safeVideoUrl.includes('youtube.com/embed/');

  return (
    <div className="bg-[#FDFBF7] text-stone-900 min-h-screen selection:bg-amber-200 antialiased">

      {/* Navigation Return Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => setCurrentPage('sites')}
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 bg-white border border-stone-200 px-4 py-2 rounded-lg shadow-sm font-semibold text-sm transition"
        >
          <ChevronLeft className="w-4 h-4" /> <span>Back to All Sites</span>
        </button>
      </div>

      {/* Main Metadata Info Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <div className="border-b border-stone-200 pb-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 mb-2 font-sans">{site.name} Overview</h1>
          <p className="text-stone-600 text-lg flex items-center gap-1.5 font-medium">
            <MapPin className="w-5 h-5 text-amber-600" /> {site.location} — <span className="text-amber-600">{site.fullEra || site.era}</span>
          </p>
        </div>
      </div>

      {/* NATIONAL GEOGRAPHIC MAGAZINE LAYOUT COLUMN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-600/10 border border-amber-600/20 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>About This Site</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-stone-900">
              The ancient city whose archeological discovery awed global visitors
            </h2>
            <p className="text-stone-700 text-lg leading-relaxed text-justify font-serif">
              {site.editorialParagraph}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xl">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={site.detailImage || site.image}
                  alt={`${site.name} showcase`}
                  className="w-full h-full object-cover filter contrast-[102%] sepia-[4%]"
                />
              </div>
              <p className="text-[11px] font-mono text-stone-500 mt-2 text-center tracking-tight">
                Historical Photo Archive // Heritage Preservation Project
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ARCHITECTURAL TIMELINE: BUILT & DESTROYED CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-600/10 border border-amber-600/20 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>Origins</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900">How Was It Built & By Whom?</h3>
            <p className="text-stone-700 leading-relaxed text-justify">{site.builtHistory}</p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-600/20 text-red-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>History</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900">How Did It Get Destroyed?</h3>
            <p className="text-stone-700 leading-relaxed text-justify">{site.destroyedHistory}</p>
          </div>
        </div>
      </div>

      {/* LIVE MEDIA GALLERY BLOCK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 border-t border-stone-200 pt-12">
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider flex items-center gap-1.5"><Camera className="w-4 h-4" /> Photo Collections</span>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mt-1">Image Gallery</h2>
          </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((img, index) => (
            <div key={index} className="group relative bg-white rounded-xl overflow-hidden border border-stone-200 aspect-[4/3] shadow-sm hover:shadow-md transition">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-mono text-amber-400 tracking-wider font-bold mb-0.5">{img.tag || 'photo'}</span>
                <h4 className="text-sm font-bold text-white">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC VIRTUAL TOURS PLAYBACK MECHANISM */}
      <div className="bg-[#FAF6F0] border-t border-orange-100 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Compass className="w-4 h-4" /> Video Exploration
                </span>
                <h3 className="text-2xl font-bold text-stone-900">Historic Site Video Tour</h3>
              </div>
            </div>

            <div className="aspect-video w-full bg-stone-950 relative flex items-center justify-center group">
              {isVideoPlaying ? (
                isYouTube ? (
                  <iframe
                    src={`${safeVideoUrl}?autoplay=1`}
                    className="w-full h-full border-0 animate-fade-in"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${site.name} video tour`}
                  />
                ) : (
                  <video
                    src={site.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    onEnded={() => setIsVideoPlaying(false)}
                  />
                )
              ) : (
                <>
                  <div className="absolute inset-0 bg-cover bg-center opacity-60 filter blur-[1px]" style={{ backgroundImage: `url(${site.image})` }} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />
                  <div className="relative z-10 text-center space-y-4">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-20 h-20 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-amber-700 hover:scale-105 transition duration-300 mx-auto"
                    >
                      <Play className="w-8 h-8 fill-current translate-x-0.5" />
                    </button>
                    <span className="block text-white text-sm font-semibold tracking-wider uppercase drop-shadow-md">
                      Watch Video Tour
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC MAP VIEW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-stone-50 border-b border-stone-200">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" /> Location Map
            </span>
          </div>
          <div className="aspect-[21/9] min-h-[350px] w-full bg-stone-100 relative">
            <iframe
              src={site.mapUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              title={`${site.name} map`}
            />
          </div>
        </div>
      </div>
               {site.references && site.references.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span> References
            </h3>
            <ul className="space-y-2">
              {site.references.map((ref, index) => (
                <li key={index}>
                  
                  <a  href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 hover:underline text-sm font-medium"
                  >
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};

export default SitePage;