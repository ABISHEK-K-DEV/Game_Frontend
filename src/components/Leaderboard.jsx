import axios from 'axios';
import { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(null);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/game/leaderboard');
            
            const sortedData = response.data.sort((a, b) => a.guesses - b.guesses || a.timeInSeconds - b.timeInSeconds);
            setLeaderboard(sortedData);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setError('Failed to fetch leaderboard');
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Player Name</th>
                            <th className="py-3 px-6 text-left">Guesses</th>
                            <th className="py-3 px-6 text-left">Time (Seconds)</th> {/* Updated header */}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {leaderboard.length > 0 ? (
                            leaderboard.map((entry, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{entry.playerName}</td>
                                    <td className="py-3 px-6">{entry.guesses}</td>
                                    <td className="py-3 px-6">{entry.timeInSeconds}</td> {/* Displaying number directly */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-3">No entries available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;