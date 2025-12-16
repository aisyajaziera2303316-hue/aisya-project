import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
    currentView: ViewState;
    setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
    const navItems = [
        { id: ViewState.HOME, label: 'Beranda', icon: '🏠' },
        { id: ViewState.CONCEPTS, label: 'Materi', icon: '📚' },
        { id: ViewState.LAB, label: 'Lab Virtual', icon: '🧪' },
        { id: ViewState.ACTIVITY, label: 'Aktivitas', icon: '🧩' },
        { id: ViewState.STORY, label: 'Cerita', icon: '📖' },
        { id: ViewState.QUIZ, label: 'Kuis', icon: '📝' },
        { id: ViewState.AI_EDITOR, label: 'AI Editor', icon: '✨' },
        { id: ViewState.TEACHER, label: 'Guru', icon: '👨‍🏫' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-card border-t border-gray-700 z-50 overflow-x-auto">
            <div className="flex justify-between md:justify-center items-center h-16 px-4 min-w-max">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`flex flex-col items-center justify-center px-4 h-full transition-colors duration-200 ${
                            currentView === item.id
                                ? 'text-accent border-t-2 border-accent'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <span className="text-xl mb-1">{item.icon}</span>
                        <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;