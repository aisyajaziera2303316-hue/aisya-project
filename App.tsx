import React, { useState } from 'react';
import { ViewState, QuizResult } from './types';
import Navigation from './components/Navigation';
import PageHome from './components/PageHome';
import PageConcepts from './components/PageConcepts';
import PageVirtualLab from './components/PageVirtualLab';
import PageActivity from './components/PageActivity';
import PageStory from './components/PageStory';
import PageQuiz from './components/PageQuiz';
import PageTeacher from './components/PageTeacher';
import AiEditor from './components/AiEditor';
import BackgroundParticles from './components/BackgroundParticles';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>(ViewState.HOME);
    const [quizData, setQuizData] = useState<QuizResult[]>([]);

    const handleSaveResult = (result: QuizResult) => {
        setQuizData(prev => [result, ...prev]);
    };

    const renderContent = () => {
        switch (view) {
            case ViewState.HOME: return <PageHome setView={setView} />;
            case ViewState.CONCEPTS: return <PageConcepts />;
            case ViewState.LAB: return <PageVirtualLab />;
            case ViewState.ACTIVITY: return <PageActivity />;
            case ViewState.STORY: return <PageStory />;
            case ViewState.QUIZ: return <PageQuiz saveResult={handleSaveResult} />;
            case ViewState.TEACHER: return <PageTeacher data={quizData} />;
            case ViewState.AI_EDITOR: return <AiEditor />;
            default: return <PageHome setView={setView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans relative">
            <BackgroundParticles />
            <main className="flex-grow pt-6 relative z-10">
                {renderContent()}
            </main>
            {/* Spacer for bottom nav */}
            <div className="h-20"></div>
            <Navigation currentView={view} setView={setView} />
        </div>
    );
};

export default App;