import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PageVirtualLab: React.FC = () => {
    const [ph, setPh] = useState<number>(7);
    const [solutionType, setSolutionType] = useState<string>('water');
    const [indicator, setIndicator] = useState<'universal' | 'litmus'>('universal');
    const [diluted, setDiluted] = useState<boolean>(false);
    
    // Chart Ref
    const svgRef = useRef<SVGSVGElement>(null);

    // Calculate derived values based on pH
    const getHConcentration = (val: number) => Math.pow(10, -val);
    const getOHConcentration = (val: number) => Math.pow(10, -(14 - val));

    // Determine Color based on pH and Indicator (Enhanced with opacity)
    const getSolutionColor = (phVal: number, ind: 'universal' | 'litmus') => {
        if (ind === 'litmus') {
            if (phVal < 6) return 'rgba(239, 68, 68, 0.85)'; // Red
            if (phVal > 8) return 'rgba(59, 130, 246, 0.85)'; // Blue
            return 'rgba(200, 200, 200, 0.5)'; // Neutral-ish
        }
        // Universal Indicator
        if (phVal < 3) return 'rgba(239, 68, 68, 0.9)'; // Red
        if (phVal < 6) return 'rgba(245, 158, 11, 0.9)'; // Orange
        if (phVal === 7) return 'rgba(34, 197, 94, 0.8)'; // Green
        if (phVal < 11) return 'rgba(59, 130, 246, 0.9)'; // Blue
        return 'rgba(147, 51, 234, 0.9)'; // Purple
    };

    const handleSolutionChange = (type: string) => {
        setSolutionType(type);
        setDiluted(false); 
        switch (type) {
            case 'strong_acid': setPh(1); break;
            case 'weak_acid': setPh(4.5); break;
            case 'water': setPh(7); break;
            case 'weak_base': setPh(9.5); break;
            case 'strong_base': setPh(13); break;
        }
    };

    const toggleDilution = () => {
        if (diluted) {
            handleSolutionChange(solutionType);
        } else {
            const diff = 7 - ph;
            setPh(Number((ph + diff * 0.5).toFixed(1)));
            setDiluted(true);
        }
    };

    // D3 Chart
    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); 

        const width = 300;
        const height = 80;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const xScale = d3.scaleLinear().domain([0, 14]).range([margin.left, width - margin.right]);

        // Gradient line
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "ph-gradient")
            .attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
        
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#EF4444"); // Red
        gradient.append("stop").attr("offset", "50%").attr("stop-color", "#22C55E"); // Green
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#8B5CF6"); // Purple

        svg.append("rect")
            .attr("x", margin.left)
            .attr("y", height / 2 - 4)
            .attr("width", width - margin.left - margin.right)
            .attr("height", 8)
            .attr("rx", 4)
            .attr("fill", "url(#ph-gradient)");

        // Indicator Needle
        const needle = svg.append("g")
            .attr("transform", `translate(${xScale(ph)}, ${height / 2})`);

        needle.append("circle")
            .attr("r", 8)
            .attr("fill", "#fff")
            .attr("stroke", "#374151")
            .attr("stroke-width", 2);
            
        needle.append("text")
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", "10px")
            .attr("font-weight", "bold")
            .text(ph);

    }, [ph]);

    // CSS Bubbles generation
    const bubbleCount = ph < 7 ? Math.floor((7 - ph) * 3) : (ph > 7 ? Math.floor((ph - 7) * 3) : 2);
    const bubbleType = ph < 7 ? "H⁺" : (ph > 7 ? "OH⁻" : "H₂O");
    const bubbles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 80 + 10 + '%',
        delay: Math.random() * 2 + 's',
        duration: Math.random() * 2 + 2 + 's',
        visible: i < bubbleCount
    }));

    return (
        <div className="p-4 max-w-6xl mx-auto pb-24 animate-fade-in flex flex-col md:flex-row gap-6">
            {/* Control Panel */}
            <div className="w-full md:w-1/3 space-y-4">
                <div className="glass p-5 rounded-2xl shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-accent flex items-center gap-2">
                        <span className="text-2xl">🎛</span> Panel Kontrol
                    </h2>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-3 text-gray-300">Pilih Larutan</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'strong_acid', label: 'Asam Kuat', color: 'border-red-500 bg-red-500/10 hover:bg-red-500/20' },
                                { id: 'weak_acid', label: 'Asam Lemah', color: 'border-orange-500 bg-orange-500/10 hover:bg-orange-500/20' },
                                { id: 'strong_base', label: 'Basa Kuat', color: 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/20' },
                                { id: 'weak_base', label: 'Basa Lemah', color: 'border-blue-500 bg-blue-500/10 hover:bg-blue-500/20' }
                            ].map(btn => (
                                <button 
                                    key={btn.id}
                                    onClick={() => handleSolutionChange(btn.id)} 
                                    className={`p-3 text-xs md:text-sm font-semibold rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${solutionType === btn.id ? btn.color.replace('10', '30') + ' ring-2 ring-white/20' : 'border-gray-600 hover:border-gray-400'}`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6 bg-gray-800/50 p-4 rounded-xl">
                        <label className="flex justify-between text-sm font-medium mb-2">
                            <span>Atur pH Manual</span>
                            <span className="text-accent font-bold bg-gray-700 px-2 rounded">{ph}</span>
                        </label>
                        <input 
                            type="range" 
                            min="0" max="14" step="0.1" 
                            value={ph}
                            onChange={(e) => { setPh(parseFloat(e.target.value)); setSolutionType('custom'); setDiluted(false); }}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                        />
                         <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                            <span>0 (Asam)</span><span>7 (Netral)</span><span>14 (Basa)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => setIndicator(indicator === 'universal' ? 'litmus' : 'universal')}
                            className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-600 bg-gray-800/50 hover:bg-gray-700 transition-colors"
                        >
                            <span className="text-xs text-gray-400 mb-1">Indikator</span>
                            <span className="font-bold text-sm">{indicator === 'universal' ? '🌈 Universal' : '📜 Lakmus'}</span>
                        </button>
                         <button 
                            onClick={toggleDilution}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${diluted ? 'bg-blue-600/20 border-blue-500 text-blue-300' : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:bg-gray-700'}`}
                        >
                            <span className="text-xs mb-1">Air (Pengenceran)</span>
                            <span className="font-bold text-sm">{diluted ? 'ON 💧' : 'OFF'}</span>
                        </button>
                    </div>
                </div>

                <div className="glass p-5 rounded-2xl border-l-4 border-yellow-400">
                    <h3 className="font-bold mb-2 text-yellow-400 flex items-center gap-2">🧠 Analisis AI</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {ph < 7 
                            ? `Larutan didominasi ion H⁺. Semakin rendah pH, semakin merah warnanya.`
                            : ph > 7 
                                ? `Larutan didominasi ion OH⁻. Semakin tinggi pH, semakin ungu/biru warnanya.`
                                : "Jumlah ion H⁺ dan OH⁻ seimbang (Netral)."
                        }
                    </p>
                </div>
            </div>

            {/* Simulation Area */}
            <div className="w-full md:w-2/3 flex flex-col items-center gap-8">
                
                {/* Stats Cards */}
                <div className="w-full grid grid-cols-3 gap-4">
                    {[
                        { label: 'pH Value', val: ph, icon: '' },
                        { label: 'Sifat', val: ph < 3 ? 'Sangat Asam' : ph < 7 ? 'Asam' : ph === 7 ? 'Netral' : ph < 12 ? 'Basa' : 'Sangat Basa', icon: '' },
                        { label: 'Visual', val: ph < 7 ? '🍋' : ph === 7 ? '💧' : '🧼', icon: '' }
                    ].map((stat, idx) => (
                        <div key={idx} className="glass p-4 rounded-xl text-center transform hover:scale-105 transition-transform">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{stat.label}</div>
                            <div className="text-xl md:text-2xl font-bold mt-1 text-white">{stat.val}</div>
                        </div>
                    ))}
                </div>

                {/* Beaker Visual - ENHANCED */}
                <div className="relative w-64 h-80">
                     {/* Beaker Container */}
                    <div className="w-full h-full border-4 border-white/20 border-t-0 rounded-b-[3rem] relative overflow-hidden bg-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        
                        {/* The Liquid */}
                        <div 
                            className="absolute bottom-0 w-full transition-all duration-1000 ease-in-out"
                            style={{ 
                                height: diluted ? '85%' : '60%', 
                                backgroundColor: getSolutionColor(ph, indicator),
                                boxShadow: `0 0 40px ${getSolutionColor(ph, indicator)}`
                            }}
                        >
                            {/* Wave Effect CSS */}
                            <div 
                                className="liquid-wave" 
                                style={{ 
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E")`,
                                    animation: 'wave 10s linear infinite'
                                }}
                            ></div>
                            <div 
                                className="liquid-wave" 
                                style={{ 
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E")`,
                                    animation: 'wave 7s linear infinite reverse',
                                    opacity: 0.4
                                }}
                            ></div>

                            {/* Rising Bubbles */}
                            {bubbles.map((b) => b.visible && (
                                <div 
                                    key={b.id}
                                    className="absolute rounded-full flex items-center justify-center text-[10px] font-bold text-white/70 select-none animate-bubble-rise"
                                    style={{
                                        left: b.left,
                                        width: '20px',
                                        height: '20px',
                                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1))',
                                        animationDelay: b.delay,
                                        animationDuration: b.duration
                                    }}
                                >
                                    {bubbleType}
                                </div>
                            ))}
                        </div>

                        {/* Glass Gloss/Reflection */}
                        <div className="absolute top-0 right-4 w-4 h-full bg-white/10 blur-[2px] rounded-full"></div>
                        <div className="absolute top-0 left-4 w-2 h-full bg-white/5 blur-[1px] rounded-full"></div>
                    </div>
                </div>

                {/* Graph */}
                <div className="w-full glass p-4 rounded-xl">
                     <svg ref={svgRef} className="w-full h-16 overflow-visible"></svg>
                </div>
            </div>
        </div>
    );
};

export default PageVirtualLab;