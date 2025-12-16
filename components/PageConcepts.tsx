import React from 'react';

const Card: React.FC<{ title: string; children: React.ReactNode; icon?: string }> = ({ title, children, icon }) => (
    <div className="glass p-6 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:-translate-y-1 mb-6 break-inside-avoid group">
        <div className="flex items-center mb-4 border-b border-gray-600/30 pb-3">
            {icon && <span className="text-3xl mr-4 group-hover:scale-125 transition-transform duration-300 inline-block">{icon}</span>}
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">{title}</h2>
        </div>
        <div className="text-gray-200 leading-relaxed text-sm md:text-base">
            {children}
        </div>
    </div>
);

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-cyan-200 font-semibold bg-cyan-900/40 px-2 py-0.5 rounded border border-cyan-500/20">{children}</span>
);

const PageConcepts: React.FC = () => {
    return (
        <div className="p-4 max-w-5xl mx-auto pb-24 animate-fade-in">
            <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Konsep Inti Asam Basa
            </h1>
            
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
                <Card title="Definisi Asam & Basa" icon="📚">
                    <ul className="space-y-4">
                        <li className="p-3 bg-white/5 rounded-lg">
                            <strong className="text-blue-300 block mb-1">Teori Arrhenius:</strong>
                            Asam melepaskan <Highlight>ion H⁺</Highlight>.<br/>
                            Basa melepaskan <Highlight>ion OH⁻</Highlight>.
                        </li>
                        <li className="p-3 bg-white/5 rounded-lg">
                            <strong className="text-blue-300 block mb-1">Teori Brønsted–Lowry:</strong>
                            Asam adalah <Highlight>donor proton</Highlight>.<br/>
                            Basa adalah <Highlight>akseptor proton</Highlight>.
                        </li>
                    </ul>
                </Card>

                <Card title="Skala pH" icon="📏">
                    <p className="mb-4">
                        pH adalah derajat keasaman yang digunakan untuk menyatakan tingkat keasaman atau kebasaan suatu larutan.
                    </p>
                    <div className="flex justify-between text-xs text-center font-mono bg-gray-900/50 p-3 rounded-lg border border-white/10 mb-2">
                        <div className="text-red-400 font-bold">0<br/>Asam</div>
                        <div className="text-green-400 font-bold">7<br/>Netral</div>
                        <div className="text-purple-400 font-bold">14<br/>Basa</div>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
                        <li><Highlight>pH &lt; 7</Highlight>: Bersifat Asam</li>
                        <li><Highlight>pH = 7</Highlight>: Bersifat Netral</li>
                        <li><Highlight>pH &gt; 7</Highlight>: Bersifat Basa</li>
                    </ul>
                </Card>

                <Card title="Sifat Zat" icon="⚗️">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                            <h4 className="font-bold text-red-300 mb-2">Asam</h4>
                            <ul className="list-disc pl-4 text-xs space-y-1">
                                <li>Masam</li>
                                <li>Korosif</li>
                                <li>Memerahkan lakmus</li>
                                <li>Konduktor</li>
                            </ul>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <h4 className="font-bold text-blue-300 mb-2">Basa</h4>
                            <ul className="list-disc pl-4 text-xs space-y-1">
                                <li>Pahit</li>
                                <li>Licin</li>
                                <li>Membirukan lakmus</li>
                                <li>Kaustik</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                <Card title="Indikator" icon="🌈">
                    <p className="mb-2">Zat yang warnanya bergantung pada pH larutan.</p>
                    <div className="flex gap-2">
                         <div className="flex-1 bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full mt-2"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Asam (Merah)</span>
                        <span>Basa (Biru)</span>
                    </div>
                </Card>

                <Card title="Kehidupan Sehari-hari" icon="🏠">
                    <div className="grid grid-cols-2 gap-3 text-center">
                        {[
                            {icon: '🍊', name: 'Jeruk', chem: 'Asam Sitrat'},
                            {icon: '🧼', name: 'Sabun', chem: 'Basa Lemah'},
                            {icon: '🔋', name: 'Aki', chem: 'Asam Sulfat'},
                            {icon: '💊', name: 'Obat Maag', chem: 'Mg(OH)₂'}
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
                                <span className="text-3xl block mb-1 animate-float" style={{animationDelay: `${i * 0.5}s`}}>{item.icon}</span>
                                <span className="text-sm font-bold block">{item.name}</span>
                                <span className="text-[10px] text-gray-400">{item.chem}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PageConcepts;