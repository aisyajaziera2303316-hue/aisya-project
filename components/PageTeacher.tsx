import React from 'react';
import { QuizResult } from '../types';

interface PageTeacherProps {
    data: QuizResult[];
}

const PageTeacher: React.FC<PageTeacherProps> = ({ data }) => {
    
    const downloadCSV = () => {
        const headers = ["Nama,Nilai,Persentase,Waktu"];
        const rows = data.map(d => `${d.studentName},${d.score},${d.percentage}%,${d.timestamp}`);
        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "nilai_siswa_asam_basa.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-8 pb-24 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Panel Guru 👨‍🏫</h1>
                    <button 
                        onClick={downloadCSV}
                        disabled={data.length === 0}
                        className={`py-2 px-4 rounded shadow font-bold text-white ${data.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        Download CSV
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nama Siswa</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nilai</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Persentase</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Belum ada data siswa yang masuk.
                                        </td>
                                    </tr>
                                ) : (
                                    data.sort((a,b) => b.timestamp.localeCompare(a.timestamp)).map((row, index) => (
                                        <tr key={row.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.studentName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.score}/{row.totalQuestions}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    row.percentage >= 80 ? 'bg-green-100 text-green-800' : 
                                                    row.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {row.percentage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.timestamp}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTeacher;