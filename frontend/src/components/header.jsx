import React from 'react';

const Header = () => {
  return (
    <>
     <div className="relative h-12 flex items-center overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 shadow-lg">
  <div className="absolute whitespace-nowrap animate-scroll">
    <p className="text-white font-medium text-sm tracking-wide px-6 inline-block">
      🌟 Welcome to the future of apps | Smooth UI • Modern Design • Pro Performance 🚀 | Built with ❤️ using React & TailwindCSS
    </p>
  </div>

  {/* Left & Right gradient fades */}
  <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-indigo-900 to-transparent pointer-events-none"></div>
  <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-purple-900 to-transparent pointer-events-none"></div>
</div>

      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 9.42s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Header;