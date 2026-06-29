import React, { useState } from 'react';
import { Sparkles, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to handle navigation and close drawer smoothly
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HeritageAI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`transition py-2 ${currentPage === 'home' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-700 hover:text-amber-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('sites')} 
              className={`transition py-2 ${currentPage === 'sites' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-700 hover:text-amber-600'}`}
            >
              Heritage Sites
            </button>
            {user && (
              <button 
                onClick={() => setCurrentPage('ar')} 
                className={`transition py-2 ${currentPage === 'ar' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-700 hover:text-amber-600'}`}
              >
                Upload Artifact
              </button>
            )}
            <button
              onClick={() => setCurrentPage('planner')}
              className={`transition py-2 ${currentPage === 'planner' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-700 hover:text-amber-600'}`}
            >
              Tour Planner
            </button>
            <button
              onClick={() => setCurrentPage('learn-ar')}
              className={`transition py-2 ${currentPage === 'learn-ar' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-700 hover:text-amber-600'}`}
            >
              Learn with AR
            </button>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button onClick={() => setCurrentPage('profile')} className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition">
                  <User className="w-5 h-5" />
                  <span>{user.user_metadata?.full_name || 'User'}</span>
                </button>
                <button onClick={logout} className="flex items-center space-x-2 px-2 py-2 text-gray-700 hover:text-amber-600 transition" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setCurrentPage('login')} className="text-gray-700 hover:text-amber-600 transition">Login</button>
                <button onClick={() => setCurrentPage('signup')} className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition">Sign Up</button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button 
              className="text-gray-700 hover:text-amber-600 p-2 rounded-md focus:outline-none" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg absolute left-0 w-full z-40">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {/* Main Routes */}
            <button onClick={() => handleNavigation('home')} className={`block w-full text-left px-3 py-2 rounded-md font-medium ${currentPage === 'home' ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-50'}`}>Home</button>
            <button onClick={() => handleNavigation('sites')} className={`block w-full text-left px-3 py-2 rounded-md font-medium ${currentPage === 'sites' ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-50'}`}>Heritage Sites</button>
            
            {user && (
              <button onClick={() => handleNavigation('ar')} className={`block w-full text-left px-3 py-2 rounded-md font-medium ${currentPage === 'ar' ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-50'}`}>Upload Artifact</button>
            )}
            
            <button onClick={() => handleNavigation('planner')} className={`block w-full text-left px-3 py-2 rounded-md font-medium ${currentPage === 'planner' ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-50'}`}>Tour Planner</button>
            <button onClick={() => handleNavigation('learn-ar')} className={`block w-full text-left px-3 py-2 rounded-md font-medium ${currentPage === 'learn-ar' ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-50'}`}>Learn with AR</button>
            
            <hr className="border-gray-200 my-2" />

            {/* User Routes inside Mobile View */}
            {user ? (
              <div className="space-y-2">
                <button onClick={() => handleNavigation('profile')} className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md font-medium ${currentPage === 'profile' ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <User className="w-5 h-5 text-gray-500" />
                  <span>{user.user_metadata?.full_name || 'My Profile'}</span>
                </button>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md font-medium text-red-600 hover:bg-red-50">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <button onClick={() => handleNavigation('login')} className="block w-full text-center px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 border border-gray-300">Login</button>
                <button onClick={() => handleNavigation('signup')} className="block w-full text-center px-3 py-2 rounded-md font-medium bg-amber-600 text-white hover:bg-amber-700">Sign Up</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;