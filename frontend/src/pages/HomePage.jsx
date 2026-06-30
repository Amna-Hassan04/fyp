import React, { useState } from 'react';
import { Camera, MapPin, Upload, Sparkles, Clock, Compass, Layers, ChevronRight, ChevronLeft, Calendar, Award, Landmark, ShieldAlert, Play, RotateCcw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Import local images from the assets folder
import uploadFeatureImg from '../assets/image_story_narration.png';
import reconstructionFeatureImg from '../assets/image_reconstruction.png';
import BuddhaPaintingImg from '../assets/taxila-mural-image.jpg';

// Reusable Craftsmanship Pattern Divider Component
const CraftsmanshipBorder = () => (
  <div className="w-full h-8 relative opacity-25 mix-blend-multiply pointer-events-none" style={{ minHeight: '32px' }}>
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='32' viewBox='0 0 60 32'%3E%3Cpath d='M0 16 L15 0 L30 16 L45 0 L60 16 L45 32 L30 16 L15 32 Z M15 16 L30 8 L45 16 L30 24 Z' fill='%2392400e' fill-opacity='0.6' stroke='%2378350f' stroke-width='1.5'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%'
      }}
    />
  </div>
);

// ============================================================================
// EXPANDED NATIONAL GEOGRAPHIC EDITORIAL DETAIL VIEW COMPONENT
// ============================================================================
const HeritageSiteDetail = ({ siteId, onBack }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const siteData = {
    taxila: {
      name: "Taxila",
      location: "Rawalpindi District, Punjab, Pakistan",
      era: "6th Century BCE",
      heroImage: "https://images.unsplash.com/photo-1627565431690-bdcf919da248?auto=format&fit=crop&q=80&w=2000",
      editorialImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200", // High impact stone/stucco sculpture matching user reference
      virtualTourUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13247.935817290505!2d72.8258356!3d33.7607739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf9e1dd0c587%3A0x6b2979ab921a812!2sTaxila%20Museum!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with your exact video source stream link
      editorialParagraph: "At the critical historical nexus where the grand trade arteries of Western Asia and the Indian subcontinent converged, the ancient city of Taxila blossomed into one of humanity’s earliest intellectual capitals. First documented as a strategic Achaemenid Persian satrapy in the 6th Century BCE, it evolved organically across the centuries—surviving the dramatic conquest of Alexander the Great and absorbing rich Hellenistic artistic influences. By the time the Mauryan Emperor Ashoka elevated Buddhism to a grand state philosophy, Taxila had transformed into a sprawling university city, drawing scholars, kings, and artists from across the known world to study science, law, and statecraft amidst its stone-sculpted monasteries and monumental stupas.",
      chronicles: {
        built: "Founded around the 6th Century BCE under the Persian Achaemenid Empire, Taxila developed at the crossroads of three major ancient trade routes, including the famous Grand Trunk Road. It was built as a majestic regional capital, blossoming into a world-renowned seat of Vedic and Buddhist learning under Emperor Ashoka the Great, who commissioned the iconic Dharmarajika Stupa and numerous stone monasteries decorated with exceptional stucco craftsmanship.",
        destroyed: "The glorious metropolitan capital met a tragic end in the late 5th Century CE. It was brutally plundered and destroyed by devastating waves of the White Huns (Hephthalites), who systematically set fire to the grand libraries, smashed monastic complexes, and massacred or dispersed the resident monks, leaving the cradle of Gandhara civilization buried under ash until modern archeological excavations."
      },
      gallery: [
        { id: 1, tag: 'architecture', title: 'Jaulian Monastery Ruins', url: 'https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&q=80&w=1000' },
        { id: 2, tag: 'artifacts', title: 'Gandhara Stucco Buddha Sculpture', url: 'https://images.unsplash.com/photo-1590075865003-e48277afd558?auto=format&fit=crop&q=80&w=1000' },
        { id: 3, tag: 'landscapes', title: 'Dharmarajika Stupa Remains', url: 'https://images.unsplash.com/photo-1627565431690-bdcf919da248?auto=format&fit=crop&q=80&w=2000' }
      ]
    },
    'mohenjo-daro': {
      name: "Mohenjo-daro",
      location: "Larkana District, Sindh, Pakistan",
      era: "2500 BCE",
      heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mohenjodaro_-_view_of_the_stupa_mound.JPG/1280px-Mohenjodaro_-_view_of_the_stupa_mound.JPG",
      editorialImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mohenjodaro_-_view_of_the_stupa_mound.JPG/1280px-Mohenjodaro_-_view_of_the_stupa_mound.JPG",
      virtualTourUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.544605963363!2d68.125!3d27.325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3935619999999999%3A0x6bd766d71efbb086!2sMohenjo-daro!5e0!3m2!1sen!2s!4v1710000000001!5m2!1sen!2s",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      editorialParagraph: "Rising majestically above the plains of the Indus River valley, Mohenjo-daro stands as an unparalleled monument to human ingenuity and ancient city planning. Established around 2500 BCE as a major epicentre of the Indus Valley Civilisation, this prehistoric metropolis thrived entirely without defensive military fortifications or palaces. Instead, its society prioritized collective urban comfort, public sanitation, and highly standardized architectural layout standards that would surprise even modern engineers.",
      chronicles: {
        built: "Engineered around 2500 BCE, Mohenjo-daro was built entirely out of standardized baked clay bricks following a remarkably sophisticated gridiron system. Its master builders created a highly stratified citadel platform alongside residential districts complete with multi-story housing layouts, independent brick bathrooms, and a monumental watertight public bath sealed with bitumen layers.",
        destroyed: "The city did not fall to foreign armies or war. Instead, it was slowly destroyed and abandoned around 1900 BCE due to environmental deterioration, devastating climatic shifts, and chronic hydrographic changes that altered the path of the Indus River, causing catastrophic flooding and crippling the agricultural backbone of the settlement."
      },
      gallery: [
        { id: 1, tag: 'architecture', title: 'The Great Bath Structure', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mohenjodaro_-_view_of_the_stupa_mound.JPG/1280px-Mohenjodaro_-_view_of_the_stupa_mound.JPG' },
        { id: 2, tag: 'artifacts', title: 'Priest-King Artifact Excavation', url: 'https://images.unsplash.com/photo-1590075865003-e48277afd558?auto=format&fit=crop&q=80&w=1000' }
      ]
    }
  };

  const site = siteData[siteId] || {
    ...siteData.taxila,
    name: siteId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    heroImage: "https://images.unsplash.com/photo-1680464140223-eab28aa2fcdc?auto=format&fit=crop&q=80&w=2071",
    editorialParagraph: "This magnificent heritage landmark forms a vital cornerstone of our shared global cultural history, preserving structural architecture styles, complex community traditions, and prehistoric craftsmanship patterns across countless generations.",
    editorialImage: "https://images.unsplash.com/photo-1680464140223-eab28aa2fcdc?auto=format&fit=crop&q=80&w=2071"
  };

  const filteredGallery = activeTab === 'all' ? site.gallery : (site.gallery ? site.gallery.filter(img => img.tag === activeTab) : []);

  return (
    <div className="bg-[#FDFBF7] text-stone-900 min-h-screen selection:bg-amber-200 antialiased">

      {/* Return Action Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 bg-white border border-stone-200 px-4 py-2 rounded-lg shadow-sm font-semibold text-sm transition">
          <ChevronLeft className="w-4 h-4" /> <span>Back to Main Directory</span>
        </button>
      </div>

      {/* Header Profile Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <div className="border-b border-stone-200 pb-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 mb-2 font-sans">{site.name} Detailed Profile</h1>
          <p className="text-stone-600 text-lg flex items-center gap-1.5 font-medium">
            <MapPin className="w-5 h-5 text-amber-600" /> {site.location} — <span className="text-amber-600">{site.era}</span>
          </p>
        </div>
      </div>

      {/* NATIONAL GEOGRAPHIC EDITORIAL MAGAZINE ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Text Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-600/10 border border-amber-600/20 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>Premium Historical Chronicle</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-stone-900">
              The 3,000-year-old Silk Road city whose discovery awed visitors
            </h2>
            <p className="text-stone-700 text-lg leading-relaxed text-justify font-serif">
              {site.editorialParagraph}
            </p>
          </div>
          {/* Editorial Picture Column */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xl">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={site.editorialImage}
                  alt="image_490bdd.jpg"
                  className="w-full h-full object-cover filter contrast-[102%] sepia-[4%]"
                />
              </div>
              <p className="text-[11px] font-mono text-stone-500 mt-2 text-center tracking-tight">
                Historical Registry Reference Photograph Archive // National Heritage Protection Framework
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CORE HISTORICAL CARDS: BUILT & DESTROYED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Construction Blueprint Card */}
          <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-600/10 border border-amber-600/20 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>Architectural Genesis</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900">How Was It Built & By Whom?</h3>
            <p className="text-stone-700 leading-relaxed text-justify">{site.chronicles?.built}</p>
          </div>

          {/* Destruction Event Card */}
          <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-600/20 text-red-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>The Cataclysm Era</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900">How Did It Get Destroyed?</h3>
            <p className="text-stone-700 leading-relaxed text-justify">{site.chronicles?.destroyed}</p>
          </div>
        </div>
      </div>

      {/* ARCHAEOLOGICAL REGISTRY REGION MAP MAPS INFRASTRUCTURE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-stone-50 border-b border-stone-200">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" /> Site Location Registry Coordinate Mapping Layer
            </span>
          </div>
          <div className="aspect-[21/9] min-h-[350px] w-full bg-stone-100 relative">
            <iframe
              src={site.virtualTourUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              title="Geospatial Map Embed Framework"
            />
          </div>
        </div>
      </div>

      {/* MEDIA GALLERY SECTION */}
      {site.gallery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 border-t border-stone-200 pt-12">
            <div>
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider flex items-center gap-1.5"><Camera className="w-4 h-4" /> Visual Catalogues</span>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mt-1">High-Fidelity Media Gallery</h2>
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
            {filteredGallery.map((img) => (
              <div key={img.id} className="group relative bg-white rounded-xl overflow-hidden border border-stone-200 aspect-[4/3] shadow-sm hover:shadow-md transition">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-mono text-amber-400 tracking-wider font-bold mb-0.5">{img.tag}</span>
                  <h4 className="text-sm font-bold text-white">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIRTUAL TOUR CINEMATIC INDUSTRIAL VIDEO THEATER COMPONENT */}
      <div className="bg-[#FAF6F0] border-t border-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Compass className="w-4 h-4" /> Interactive Exploration System
                </span>
                <h3 className="text-2xl font-bold text-stone-900">Virtual Drone & Ground Video Tour</h3>
              </div>
              <p className="text-stone-600 text-sm max-w-xs">
                Launch a cinematic high-definition immersive flyover stream detailing the preserved landmarks of this site.
              </p>
            </div>

            {/* Video Canvas Sandbox Container */}
            <div className="aspect-video w-full bg-stone-950 relative flex items-center justify-center group">
              {isVideoPlaying ? (
                <video
                  src={site.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onEnded={() => setIsVideoPlaying(false)}
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-cover bg-center opacity-60 filter blur-[1px]" style={{ backgroundImage: `url(${site.heroImage})` }} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />
                  <div className="relative z-10 text-center space-y-4">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-20 h-20 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-amber-700 hover:scale-105 transition duration-300 mx-auto"
                    >
                      <Play className="w-8 h-8 fill-current translate-x-0.5" />
                    </button>
                    <span className="block text-white text-sm font-semibold tracking-wider uppercase drop-shadow-md">
                      Start Virtual Video Tour
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// ============================================================================
// MAIN RECONFIGURED CORE LANDING DASHBOARD
// ============================================================================
const HomePage = ({ setCurrentPage }) => {
  const { user } = useAuth();

  const sites = [
    {
      id: 'taxila',
      name: 'Taxila',
      description: 'Ancient Buddhist city and UNESCO World Heritage Site',
      image: 'https://plus.unsplash.com/premium_photo-1694475128245-999b1ae8a44e?w=800',
      era: '6th Century BCE'
    },
    {
      id: 'mohenjo-daro',
      name: 'Mohenjo-daro',
      description: 'One of the world\'s earliest urban settlements',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mohenjodaro_-_view_of_the_stupa_mound.JPG/1280px-Mohenjodaro_-_view_of_the_stupa_mound.JPG?w=800',
      era: '2500 BCE'
    },
    {
      id: 'harappa',
      name: 'Harappa',
      description: 'Major center of the Indus Valley Civilization',
      image: 'https://cdn1.byjus.com/wp-content/uploads/2018/11/free-ias-prep/2017/01/13062915/Urban-planning-of-the-Harappan.jpg?w=800',
      era: '3300 BCE'
    },
    {
      id: 'katas-raj',
      name: 'Katas Raj Temples',
      description: 'Ancient complex of Hindu temples connected by a sacred pond',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Katas_Raj_Temples_2.JPG/1280px-Katas_Raj_Temples_2.JPG?w=800',
      era: '7th Century CE'
    },
    {
      id: 'makli',
      name: 'Makli Necropolis',
      description: 'One of the largest funerary sites in the world with stunning stone carvings',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/View_of_Makli_by_Usman_Ghani_%28cropped%29.jpg?w=800',
      era: '14th Century CE'
    },
    {
      id: 'ranikot',
      name: 'Ranikot Fort',
      description: 'Known as the Great Wall of Sindh, the largest fort in the world',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ranikot_Fort_-_The_Great_Wall_of_Sindh.jpg/1280px-Ranikot_Fort_-_The_Great_Wall_of_Sindh.jpg',
      era: '17th Century CE'
    }
  ];

  return (
    <div className="bg-[#FDFBF7] text-stone-900 min-h-screen selection:bg-amber-200 antialiased">

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(253, 251, 247, 0.75), rgba(253, 251, 247, 0.25)), url('https://images.unsplash.com/photo-1680464140223-eab28aa2fcdc?auto=format&fit=crop&q=80&w=2071')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 font-sans tracking-tight">
              Explore Pakistan's Ancient Civilizations with AI
            </h1>
            <p className="text-xl text-stone-800 mb-8 font-medium leading-relaxed">
              Your personal guide to South Asian heritage. Upload artifacts, discover stories, and experience history through cutting-edge AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentPage(user ? 'ar' : 'signup')}
                className="bg-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-700 transition flex items-center justify-center space-x-2 shadow-lg"
              >
                <Camera className="w-5 h-5" />
                <span>Upload an Artifact</span>
              </button>
              <button
                onClick={() => setCurrentPage('ar')}
                className="bg-white text-amber-600 border-2 border-amber-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-50 transition flex items-center justify-center space-x-2 shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                <span>Explore Sites</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-2">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-stone-900 mb-4 font-sans tracking-tight">
          How HeritageAI Works
        </h2>
        <p className="text-center text-stone-600 text-lg max-w-2xl mx-auto mb-16">
          An integrated intelligent ecosystem designed to map, preserve, and explore South Asian historical milestones.
        </p>
      </div>

      {/* Alternating Banners */}
      <div className="space-y-0">

        {/* MODULE 01: ARTIFACT IDENTIFICATION */}
        <div className="relative bg-orange-500/[0.045] py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-fixed bg-center opacity-[0.22] pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1694475128245-999b1ae8a44e?w=1200')` }}
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6 bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-orange-200/80 shadow-md shadow-amber-900/[0.03]">
              <div className="inline-flex items-center space-x-2 bg-amber-600/10 border border-amber-600/20 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Upload className="w-3.5 h-3.5" />
                <span>Module 01: AI Image Recognition</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 font-sans leading-tight tracking-tight">
                Capture Historical Artifacts
              </h2>
              <p className="text-stone-700 text-lg leading-relaxed">
                Easily save and identify historical objects. Just take a photo or upload an image of an artifact found at archaeological sites or museums.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-[#FDFBF7]/90 p-4 rounded-lg border border-stone-200/60">
                  <div className="text-amber-600 font-bold mt-0.5">✓</div>
                  <p className="text-sm text-stone-600"><strong className="text-stone-900 block mb-0.5">Smart Object Detection</strong> Automatically recognizes the type, shape, and important features of the artifact.</p>
                </div>
                <div className="flex items-start space-x-3 bg-[#FDFBF7]/90 p-4 rounded-lg border border-stone-200/60">
                  <div className="text-amber-600 font-bold mt-0.5">✓</div>
                  <p className="text-sm text-stone-600"><strong className="text-stone-900 block mb-0.5">Confidence Mapping</strong> Computes precise localization vectors and authenticity markers.</p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage(user ? 'ar' : 'signup')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-lg transition shadow-md flex items-center gap-2 group text-base"
                >
                  <span>Launch Artifact Uploader</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xl space-y-4 max-w-sm mx-auto">
                <div className="text-xs uppercase tracking-widest font-mono text-stone-500 border-b border-stone-200 pb-2">Image Processing Engine</div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-stone-100">
                  <img src={uploadFeatureImg} alt="Artifact upload feature capture workflow" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-center text-xs text-stone-500 font-mono pt-1">
                  <span>Status: Image Parsed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Craftsmanship Divider Line */}
        <CraftsmanshipBorder />

        {/* MODULE 02: UNCOVER CHRONICLES */}
        <div className="relative bg-amber-500/[0.04] py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-fixed bg-center opacity-[0.22] pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mohenjodaro_-_view_of_the_stupa_mound.JPG/1280px-Mohenjodaro_-_view_of_the_stupa_mound.JPG')` }}
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xl space-y-4 max-w-sm mx-auto font-mono text-xs text-stone-700">
                <div className="text-xs uppercase tracking-widest text-amber-700 border-b border-stone-200 pb-2">Dataset Reference Registry</div>
                <div className="space-y-2">
                  <p className="text-amber-700 font-bold">// Civilizational Lineage</p>
                  <p><span className="text-stone-400">Origin:</span> Indus Valley Cluster</p>
                  <p><span className="text-stone-400">Period:</span> Mature Harappan (2600-1900 BCE)</p>
                  <p><span className="text-stone-400">Impact:</span> Regional Standardized Trade Systems</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6 bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-amber-200/80 shadow-md shadow-amber-900/[0.03]">
              <div className="inline-flex items-center space-x-2 bg-amber-600/10 border border-amber-600/20 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Module 02: Historical Information</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 font-sans leading-tight tracking-tight">
                Vetted Chronicle Discovery
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
               Learn about the history, culture, and significance of artifacts through trusted historical sources and research.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-[#FDFBF7]/90 p-4 rounded-lg border border-stone-200/60">
                  <div className="text-amber-600 font-bold mt-0.5">✓</div>
                  <p className="text-sm text-gray-600"><strong className="text-stone-900 block mb-0.5">Trusted Historical Sources</strong> Information collected from museums, researchers, and educational resources.</p>
                </div>
                <div className="flex items-start space-x-3 bg-[#FDFBF7]/90 p-4 rounded-lg border border-stone-200/60">
                  <div className="text-amber-600 font-bold mt-0.5">✓</div>
                  <p className="text-sm text-gray-600"><strong className="text-stone-900 block mb-0.5">Societal Metrics</strong> Explores regional structural impacts, cultural lineages, and ancestry paths.</p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('sites')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-lg transition shadow-md flex items-center gap-2 group text-base"
                >
                  <span>Explore Site Chronicles</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Craftsmanship Divider Line */}
        <CraftsmanshipBorder />

        {/* MODULE 03: SMART PLANNER */}
        <div className="relative bg-orange-500/[0.045] py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-fixed bg-center opacity-[0.22] pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ranikot_Fort_-_The_Great_Wall_of_Sindh.jpg/1280px-Ranikot_Fort_-_The_Great_Wall_of_Sindh.jpg')` }}
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6 bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-orange-200/80 shadow-md shadow-amber-900/[0.03]">
              <div className="inline-flex items-center space-x-2 bg-amber-600/10 border border-amber-600/20 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Module 03: Smart Trip Planner</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 font-sans leading-tight tracking-tight">
                 Plan Safe Historical Tours
              </h2>
              <p className="text-stone-700 text-lg leading-relaxed">
                Experience Pakistan's historical treasures securely. Our AI helps create routes, recommends places to visit, and checks for travel updates and safety information.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-[#FDFBF7]/90 p-4 rounded-lg border border-stone-200/60">
                  <div className="text-amber-600 font-bold mt-0.5">✓</div>
                  <p className="text-sm text-gray-600"><strong className="text-stone-900 block mb-0.5">Personalized Travel Plans</strong> Creates custom historical tours based on your interests and destination preferences.</p>
                </div>
                <div className="flex items-start space-x-3 bg-[#FDFBF7]/90 p-4 rounded-lg border border-stone-200/60">
                  <div className="text-amber-600 font-bold mt-0.5">✓</div>
                  <p className="text-sm text-gray-600"><strong className="text-stone-900 block mb-0.5">Live Safety Validations</strong> Cross-checks global and local news layers prior to finalizing transit plans.</p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('planner')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-lg transition shadow-md flex items-center gap-2 group text-base"
                >
                  <span>Launch Agentic Tour Planner</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xl space-y-4 max-w-sm mx-auto">
                <div className="text-xs uppercase tracking-widest font-mono text-stone-500 border-b border-stone-200 pb-2">LangGraph Pipeline Monitor</div>
                <div className="flex items-center gap-3 text-xs text-emerald-400 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                  <span>[Node: Guardrail] Intent Approved</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-amber-400 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                  <span>[Node: Planner] Structuring Route...</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200 opacity-60">
                  <div className="w-2 h-2 rounded-full bg-stone-400"></div>
                  <span>[Node: Live Validator] Awaiting...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Craftsmanship Divider Line */}
        <CraftsmanshipBorder />

        {/* MODULE 04: WEBAR RECONSTRUCTION GAMIFICATION */}
        <div className="relative bg-[#FAF4EB]/90 py-24 overflow-hidden border-t border-b border-amber-600/15">
          <div
            className="absolute inset-0 bg-cover bg-fixed bg-center opacity-[0.25] pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1694475128245-999b1ae8a44e?w=1200')` }}
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6 bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-orange-200/80 shadow-md shadow-amber-900/[0.03]">
              <div className="inline-flex items-center space-x-2 bg-amber-600/10 border border-amber-600/20 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Module 04: Augmented Reality Integration</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 font-sans leading-tight tracking-tight">
                Learn with AR: Reassembling History
              </h2>
              <p className="text-stone-700 text-lg leading-relaxed">
                Priceless stucco mural paintings discovered at the <strong>Jinnan Wali Dheri monastery in Taxila</strong> are heavily shattered, presenting massive visual challenges to museum visitors. HeritageAI introduces an interactive tool.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-[#FDFBF7]/90 p-4 rounded-lg border border-stone-200/60">
                  <div className="text-amber-700 font-bold mt-0.5">✓</div>
                  <p className="text-sm text-stone-600"><strong className="text-stone-900 block mb-0.5">Camera Feature Tracking</strong> Instantly recognizes historical artifacts through your device's camera.</p>
                </div>
                <div className="flex items-start space-x-3 bg-[#FDFBF7]/90 p-4 rounded-lg border border-stone-200/60">
                  <div className="text-amber-700 font-bold mt-0.5">✓</div>
                  <p className="text-sm text-stone-600"><strong className="text-stone-900 block mb-0.5">Interactive Canvas Grid</strong> Explore artifacts through fun puzzles and hands-on educational activities.</p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('learn-ar')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-lg transition shadow-md flex items-center gap-2 group text-base"
                >
                  <span>Launch AR Experience ⚡</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xl space-y-4 max-w-sm mx-auto group">
                <div className="text-xs uppercase tracking-widest font-mono text-stone-500 border-b border-stone-200 pb-2 flex justify-between">
                  <span>WebXR Target Stream</span>
                  <span className="text-amber-700 font-bold">IDX::04_GANDHARA</span>
                </div>

                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-950 border border-stone-200 relative shadow-inner">
                  <div className="absolute inset-x-0 h-0.5 bg-amber-500 shadow-[0_0_14px_#d97706] opacity-90 animate-[homeScanLine_3.5s_linear_infinite] z-10"></div>
                  <img
                    src="/assets/restored-buddha.png"
                    alt="AI Reconstructed Buddha Painting Matrix"
                    className="w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out absolute inset-0 z-5 bg-stone-950"
                  />
                  <img
                    src={BuddhaPaintingImg}
                    alt="Fragmented baseline reference target profile"
                    className="w-full h-full object-contain opacity-100 group-hover:opacity-0 transition-all duration-700 ease-in-out absolute inset-0 bg-stone-950"
                  />

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center z-10 pointer-events-none">
                    <span className="absolute bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded border border-amber-600/40 font-mono text-[10px] text-amber-500 tracking-wider uppercase group-hover:scale-95 group-hover:opacity-0 transition-all duration-500">
                      Matrix Scanner Active
                    </span>
                    <span className="absolute bg-emerald-950/80 backdrop-blur-sm px-3 py-1.5 rounded border border-emerald-500/40 font-mono text-[10px] text-emerald-400 tracking-wider uppercase scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                       AI Match Complete
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] text-stone-500 font-mono pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Tracking Sync: OK
                  </span>
                  <span className="text-stone-500 group-hover:text-emerald-600 font-semibold transition-colors duration-300">
                    Hover to Scan Frame
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes homeScanLine {
            0% { top: 0%; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>

      </div>

      {/* Featured Heritage Sites Grid */}
      <div className="bg-[#FAF6F0] py-24 border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-900 mb-12 font-sans tracking-tight">
            Featured Heritage Sites
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sites.map(site => (
              <div
                key={site.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer border border-stone-200/40 flex flex-col justify-between"
                onClick={() => setCurrentPage(`site-${site.id}`)}
              >
                <div>
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img src={site.image} alt={site.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-stone-900">{site.name}</h3>
                      <span className="text-sm text-amber-600 font-semibold">{site.era}</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{site.description}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button className="text-amber-600 font-semibold flex items-center space-x-1 hover:text-amber-700 text-sm">
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-12 text-center shadow-xl shadow-orange-950/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans tracking-tight">
            Ready to Explore?
          </h2>
          <p className="text-xl text-amber-50 mb-8">
            Join thousands discovering Pakistan's rich cultural heritage
          </p>
          <button
            onClick={() => setCurrentPage(user ? 'ar' : 'signup')}
            className="bg-white text-amber-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition inline-flex items-center space-x-2"
          >
            <span>Get Started Free</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;