import React from 'react';
import { Grid3x3 } from 'lucide-react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <div className="relative">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin duration-1000 w-32 h-32"></div>

                {/* Inner pulsating circle */}
                <div className="absolute inset-2 rounded-full border-2 border-orange-100 animate-ping opacity-20 w-28 h-28"></div>

                {/* Center Waffle Icon */}
                <div className="relative flex items-center justify-center w-32 h-32 bg-white/50 backdrop-blur-sm rounded-full shadow-lg border border-amber-100">
                    <Grid3x3 className="w-12 h-12 text-amber-600 animate-pulse" strokeWidth={2.5} />
                </div>

                {/* Decorative floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            {/* Text Content */}
            <div className="mt-8 text-center space-y-2">
                <h2 className="text-3xl font-serif font-bold text-amber-900 tracking-wide animate-fade-in">
                    Waffle House
                </h2>
                <div className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <p className="text-amber-700/80 font-medium text-sm uppercase tracking-widest mt-2">
                    Preparing Goodness
                </p>
            </div>

            {/* CSS for custom animations */}
            <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
