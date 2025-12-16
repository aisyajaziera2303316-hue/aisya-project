import React from 'react';

const BackgroundParticles: React.FC = () => {
    // Generate random positions for floating elements
    const elements = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 10}s`,
        size: `${20 + Math.random() * 40}px`,
        opacity: 0.05 + Math.random() * 0.1,
        content: Math.random() > 0.6 ? 'H⁺' : Math.random() > 0.5 ? 'OH⁻' : '🫧'
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Gradient Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-glow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            
            {/* Floating Chemical Symbols */}
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="absolute font-bold text-white select-none animate-float"
                    style={{
                        left: el.left,
                        top: el.top,
                        fontSize: el.size,
                        opacity: el.opacity,
                        animationDuration: el.duration,
                        animationDelay: el.delay,
                    }}
                >
                    {el.content}
                </div>
            ))}
        </div>
    );
};

export default BackgroundParticles;