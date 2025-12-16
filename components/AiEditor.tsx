import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';

const AiEditor: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                setGeneratedImage(null); // Reset previous result
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!selectedImage || !prompt.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const result = await editImageWithGemini(selectedImage, prompt);
            setGeneratedImage(result);
        } catch (err) {
            setError("Gagal mengedit gambar. Coba lagi dengan instruksi yang berbeda.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto pb-24 animate-fade-in">
             <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    AI Lab Assistant ✨
                </h1>
                <p className="text-gray-400">
                    Unggah foto percobaan kimiamu dan minta AI untuk memodifikasinya! <br/>
                    <span className="text-xs text-gray-500">(Powered by Gemini 2.5 Flash Image)</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="bg-card p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white mb-2">1. Upload & Instruksi</h3>
                    
                    <div 
                        className="border-2 border-dashed border-gray-600 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors relative overflow-hidden"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {selectedImage ? (
                            <img src={selectedImage} alt="Original" className="w-full h-full object-contain" />
                        ) : (
                            <div className="text-center text-gray-500">
                                <span className="text-2xl">📁</span>
                                <p>Klik untuk upload gambar</p>
                            </div>
                        )}
                        <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            className="hidden" 
                        />
                    </div>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Contoh: Ubah warna larutan menjadi hijau neon, atau tambahkan asap tebal di gelas kimia."
                        className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white focus:ring-2 focus:ring-accent outline-none min-h-[100px]"
                    />

                    <button 
                        onClick={handleGenerate}
                        disabled={loading || !selectedImage || !prompt.trim()}
                        className={`w-full py-3 rounded-lg font-bold transition-all ${
                            loading || !selectedImage || !prompt.trim()
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg'
                        }`}
                    >
                        {loading ? 'Sedang Memproses AI...' : 'Generate Magic ✨'}
                    </button>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                </div>

                {/* Output Section */}
                <div className="bg-card p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col">
                     <h3 className="text-xl font-bold text-white mb-4">2. Hasil AI</h3>
                     <div className="flex-1 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800 relative overflow-hidden min-h-[300px]">
                        {loading ? (
                             <div className="flex flex-col items-center gap-3">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                                <span className="text-gray-400 text-sm animate-pulse">AI sedang berpikir...</span>
                             </div>
                        ) : generatedImage ? (
                            <img src={generatedImage} alt="Generated" className="w-full h-full object-contain animate-fade-in" />
                        ) : (
                            <p className="text-gray-600 text-sm text-center px-4">
                                Hasil edit gambar akan muncul di sini.
                            </p>
                        )}
                     </div>
                     {generatedImage && (
                         <a 
                            href={generatedImage} 
                            download="hasil-kimia-ai.png"
                            className="mt-4 block w-full text-center py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white"
                        >
                            Download Hasil
                         </a>
                     )}
                </div>
            </div>
        </div>
    );
};

export default AiEditor;