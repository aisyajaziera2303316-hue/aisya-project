import React, { useState } from 'react';

const PageActivity: React.FC = () => {
    const [answered, setAnswered] = useState<number | null>(null);
    const [correct, setCorrect] = useState<boolean>(false);

    const reset = () => {
        setAnswered(null);
        setCorrect(false);
    };

    const handleAnswer = (index: number, isCorrect: boolean) => {
        setAnswered(index);
        setCorrect(isCorrect);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto pb-24 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2 text-center">Tantangan Kontekstual</h1>
            <p className="text-center text-gray-400 mb-8">Selesaikan masalah di bawah ini dengan konsep yang sudah dipelajari.</p>

            <div className="bg-card rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                <div className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="text-4xl">🐟</div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Kasus: Kolam Ikan Pak Budi</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Pak Budi mengeluh ikan di kolamnya banyak yang mati. Setelah dicek menggunakan indikator universal, air kolam menunjukkan warna <strong>merah jingga (pH ~4)</strong>. Hal ini mungkin disebabkan oleh hujan asam. Apa yang harus dilakukan Pak Budi untuk menetralkan air kolam agar ikan selamat?
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <button 
                            disabled={answered !== null}
                            onClick={() => handleAnswer(0, false)}
                            className={`p-4 text-left rounded-lg border transition-all ${
                                answered === 0 
                                    ? 'bg-red-900/50 border-red-500 text-red-200' 
                                    : 'bg-gray-800 border-gray-600 hover:border-accent hover:bg-gray-700'
                            }`}
                        >
                            A. Menambahkan lebih banyak air hujan
                        </button>
                        <button 
                            disabled={answered !== null}
                            onClick={() => handleAnswer(1, false)}
                            className={`p-4 text-left rounded-lg border transition-all ${
                                answered === 1 
                                    ? 'bg-red-900/50 border-red-500 text-red-200' 
                                    : 'bg-gray-800 border-gray-600 hover:border-accent hover:bg-gray-700'
                            }`}
                        >
                            B. Menambahkan cuka (Asam Asetat)
                        </button>
                        <button 
                            disabled={answered !== null}
                            onClick={() => handleAnswer(2, true)}
                            className={`p-4 text-left rounded-lg border transition-all ${
                                answered === 2 
                                    ? 'bg-green-900/50 border-green-500 text-green-200' 
                                    : 'bg-gray-800 border-gray-600 hover:border-accent hover:bg-gray-700'
                            }`}
                        >
                            C. Menaburkan kapur tohor (Basa)
                        </button>
                        <button 
                            disabled={answered !== null}
                            onClick={() => handleAnswer(3, false)}
                            className={`p-4 text-left rounded-lg border transition-all ${
                                answered === 3 
                                    ? 'bg-red-900/50 border-red-500 text-red-200' 
                                    : 'bg-gray-800 border-gray-600 hover:border-accent hover:bg-gray-700'
                            }`}
                        >
                            D. Menambahkan garam dapur
                        </button>
                    </div>

                    {answered !== null && (
                        <div className={`mt-6 p-4 rounded-lg border ${correct ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'} animate-fade-in`}>
                            <h4 className={`font-bold mb-1 ${correct ? 'text-green-400' : 'text-red-400'}`}>
                                {correct ? "Jawaban Benar! 🎉" : "Kurang Tepat ❌"}
                            </h4>
                            <p className="text-sm text-gray-200">
                                {correct 
                                    ? "Kapur tohor (Kalsium Oksida/Hidroksida) bersifat basa. Menambahkan basa ke dalam asam akan menaikkan pH menuju netral (Reaksi Netralisasi)."
                                    : "Ingat, air kolam bersifat Asam (pH rendah). Untuk menetralkannya, kita butuh zat yang bersifat Basa (Lawan dari Asam)."}
                            </p>
                            {!correct && (
                                <button onClick={reset} className="mt-3 text-sm text-accent hover:underline">
                                    Coba lagi
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageActivity;