import React, { useState } from 'react';
import { Question, QuizResult } from '../types';

interface PageQuizProps {
    saveResult: (result: QuizResult) => void;
}

const questions: Question[] = [
    {
        id: 1,
        text: "Manakah pernyataan yang BENAR menurut teori Arrhenius?",
        options: [
            "Asam menerima proton",
            "Basa menghasilkan ion H⁺",
            "Asam menghasilkan ion H⁺ dalam air",
            "Basa menerima pasangan elektron"
        ],
        correctIndex: 2,
        explanation: "Arrhenius mendefinisikan asam sebagai zat yang melepaskan ion H⁺ saat dilarutkan dalam air."
    },
    {
        id: 2,
        text: "Jika suatu larutan memiliki pH 9, maka larutan tersebut bersifat...",
        options: ["Asam Kuat", "Netral", "Basa", "Asam Lemah"],
        correctIndex: 2,
        explanation: "Larutan dengan pH > 7 bersifat Basa."
    },
    {
        id: 3,
        text: "Kertas lakmus merah akan berubah menjadi biru jika dicelupkan ke dalam...",
        options: ["Air jeruk", "Cuka dapur", "Air sabun", "Larutan garam"],
        correctIndex: 2,
        explanation: "Air sabun bersifat basa, yang mengubah lakmus merah menjadi biru."
    },
    {
        id: 4,
        text: "Reaksi antara asam dan basa yang menghasilkan garam dan air disebut...",
        options: ["Oksidasi", "Netralisasi", "Reduksi", "Hidrolisis"],
        correctIndex: 1,
        explanation: "Asam + Basa -> Garam + Air adalah reaksi Netralisasi."
    },
    {
        id: 5,
        text: "Berapa konsentrasi ion H⁺ jika pH larutan adalah 3?",
        options: ["0.001 M", "0.003 M", "0.01 M", "3 M"],
        correctIndex: 0,
        explanation: "pH = -log[H⁺]. Jika pH=3, maka [H⁺] = 10⁻³ = 0.001 M."
    }
];

const PageQuiz: React.FC<PageQuizProps> = ({ saveResult }) => {
    const [name, setName] = useState('');
    const [started, setStarted] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [answers, setAnswers] = useState<number[]>([]);

    const handleStart = () => {
        if (name.trim()) setStarted(true);
    };

    const handleAnswer = (optionIndex: number) => {
        const isCorrect = optionIndex === questions[currentQ].correctIndex;
        if (isCorrect) setScore(s => s + 1);
        
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);

        if (currentQ < questions.length - 1) {
            setCurrentQ(c => c + 1);
        } else {
            finishQuiz(score + (isCorrect ? 1 : 0));
        }
    };

    const finishQuiz = (finalScore: number) => {
        setCompleted(true);
        const result: QuizResult = {
            id: Date.now().toString(),
            studentName: name,
            score: finalScore,
            totalQuestions: questions.length,
            percentage: (finalScore / questions.length) * 100,
            timestamp: new Date().toLocaleString()
        };
        saveResult(result);
    };

    if (!started) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 animate-fade-in">
                <div className="bg-card p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 text-center">
                    <h2 className="text-2xl font-bold mb-2 text-white">Kuis Asam Basa</h2>
                    <p className="text-gray-400 mb-6">Uji pemahamanmu sekarang!</p>
                    
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama Lengkap"
                        className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white mb-4 focus:ring-2 focus:ring-accent outline-none"
                    />
                    
                    <button
                        onClick={handleStart}
                        disabled={!name.trim()}
                        className={`w-full py-3 rounded-lg font-bold transition-all ${
                            name.trim() 
                                ? 'bg-accent hover:bg-blue-600 text-white shadow-lg transform hover:-translate-y-1' 
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Mulai Kuis
                    </button>
                </div>
            </div>
        );
    }

    if (completed) {
        const percentage = (score / questions.length) * 100;
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 animate-fade-in">
                <div className="bg-card p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-white">Hasil Kuis</h2>
                    <div className="text-6xl font-bold mb-2 text-accent">{score}/{questions.length}</div>
                    <div className="text-xl text-gray-300 mb-6">{percentage}% Benar</div>
                    
                    <p className="text-gray-200 mb-8 italic">
                        {percentage === 100 ? "Luar Biasa! Sempurna! 🌟" : 
                         percentage >= 80 ? "Kerja Bagus! 👍" : 
                         percentage >= 60 ? "Cukup Baik, tingkatkan lagi! 📚" : "Jangan menyerah, ayo belajar lagi! 💪"}
                    </p>

                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
                    >
                        Ulangi (Refresh)
                    </button>
                </div>
            </div>
        );
    }

    const q = questions[currentQ];

    return (
        <div className="p-6 max-w-2xl mx-auto pb-24 animate-fade-in">
            <div className="mb-6 flex justify-between items-center text-sm text-gray-400">
                <span>Soal {currentQ + 1} dari {questions.length}</span>
                <span>{name}</span>
            </div>

            <div className="bg-card p-6 rounded-xl border border-gray-700 shadow-lg">
                <h3 className="text-xl font-medium mb-6 leading-relaxed">{q.text}</h3>
                
                <div className="space-y-3">
                    {q.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="w-full text-left p-4 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-accent transition-all"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageQuiz;