import React, { useState } from 'react';

const PageStory: React.FC = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            text: "Hari ini panas sekali. Andi baru saja selesai olahraga dan merasa sangat haus. Ia melihat ada dua minuman di meja: Jus Jeruk segar dan Air Mineral. Tanpa pikir panjang, Andi meminum Jus Jeruk dengan cepat padahal perutnya kosong.",
            choices: [
                { label: "Lanjut...", next: 1 }
            ]
        },
        {
            text: "Beberapa menit kemudian, Andi memegangi perutnya. 'Aduh, perih sekali!' keluhnya. Perutnya terasa panas dan melilit. Apa yang terjadi pada lambung Andi?",
            choices: [
                { label: "Asam lambung naik karena jus jeruk", next: 2, correct: true },
                { label: "Lambung menjadi basa", next: 3, correct: false }
            ]
        },
        {
            text: "Benar! Jus jeruk mengandung Asam Sitrat. Lambung kita sudah mengandung Asam Klorida (HCl). Menambah asam saat perut kosong membuat kondisi lambung 'Sangat Asam' (pH turun drastis), menyebabkan iritasi.",
            choices: [
                { label: "Apa solusinya?", next: 4 }
            ]
        },
        {
            text: "Salah. Jus jeruk bersifat Asam. Jika ditambah asam lambung, kondisi menjadi makin asam, bukan basa.",
            choices: [
                { label: "Kembali berpikir", next: 1 }
            ]
        },
        {
            text: "Andi butuh pertolongan pertama. Ibu Andi datang membawa obat maag cair. Obat maag biasanya mengandung Magnesium Hidroksida Mg(OH)₂. Apa sifat obat ini?",
            choices: [
                { label: "Asam", next: 5, correct: false },
                { label: "Basa", next: 6, correct: true }
            ]
        },
        {
            text: "Kurang tepat. Jika obatnya asam, perut Andi akan makin sakit!",
            choices: [
                { label: "Coba lagi", next: 4 }
            ]
        },
        {
            text: "Tepat! Obat maag bersifat Basa. Ketika Andi meminumnya, basa akan bereaksi dengan kelebihan asam di lambung. pH lambung akan naik kembali ke normal. Ini disebut REAKSI NETRALISASI. Akhirnya, sakit perut Andi mereda.",
            choices: [
                { label: "Selesai Cerita", next: 0 } // Loop back or end
            ]
        }
    ];

    const currentStep = steps[step];

    return (
        <div className="p-6 max-w-2xl mx-auto pb-24 flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
            <h1 className="text-3xl font-bold mb-8 text-accent">Kisah Si Andi</h1>
            
            <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl relative w-full">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Bagian {step + 1}
                </div>

                <p className="text-lg leading-relaxed mb-8 font-medium">
                    {currentStep.text}
                </p>

                <div className="space-y-3">
                    {currentStep.choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => setStep(choice.next)}
                            className="w-full block bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-3 px-4 rounded-lg transition-colors border-2 border-transparent hover:border-blue-500"
                        >
                            {choice.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageStory;