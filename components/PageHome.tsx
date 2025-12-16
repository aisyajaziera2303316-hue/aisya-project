import React from 'react';
import { ViewState } from '../types';

interface PageHomeProps {
    setView: (view: ViewState) => void;
}

const PageHome: React.FC<PageHomeProps> = ({ setView }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center animate-fade-in space-y-12">
            
            {/* Hero Section */}
            <div className="relative z-10 space-y-6">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-2 animate-bounce">
                    🧪 Selamat Datang di Laboratorium Maya
                </div>
                <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 drop-shadow-lg">
                    Asam & Basa
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Jelajahi dunia kimia yang penuh warna. Mengapa lemon masam? Mengapa sabun licin? Temukan jawabannya di sini.
                </p>
            </div>

            {/* Feature Cards - Floating Effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
                {[
                    { icon: '🍋', title: 'Asam', desc: 'Donor Proton (H⁺)', color: 'text-yellow-400', delay: '0s' },
                    { icon: '⚖️', title: 'pH Scale', desc: 'Indikator Kekuatan', color: 'text-green-400', delay: '0.2s' },
                    { icon: '🧼', title: 'Basa', desc: 'Akseptor Proton', color: 'text-purple-400', delay: '0.4s' }
                ].map((card, idx) => (
                    <div 
                        key={idx}
                        className="glass p-8 rounded-2xl shadow-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400/50 group"
                        style={{ animationDelay: card.delay }}
                    >
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                        <h3 className={`text-2xl font-bold mb-2 ${card.color}`}>{card.title}</h3>
                        <p className="text-sm text-gray-400">{card.desc}</p>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-6 mt-8 w-full max-w-md z-10">
                <button 
                    onClick={() => setView(ViewState.CONCEPTS)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                    <span>Mulai Belajar</span>
                    <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                </button>
                <button 
                     onClick={() => setView(ViewState.QUIZ)}
                    className="flex-1 glass text-white hover:bg-white/10 border-2 border-white/20 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:border-white/50"
                >
                    Langsung Kuis
                </button>
            </div>
            
            {/* Animated SVG Graphic */}
            <div className="absolute bottom-0 opacity-20 pointer-events-none w-full flex justify-center overflow-hidden">
                <svg className="w-full max-w-4xl h-48 animate-pulse-glow" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                   <path fill="#3B82F6" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default PageHome;