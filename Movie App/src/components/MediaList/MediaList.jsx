import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

const MediaList = () => {
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDk3NDIwMDlmZTM4ZTUxYWE5Zjc4YjkxNDdjMzZjMyIsIm5iZiI6MTczNDEwMjY5OS40MjksInN1YiI6IjY3NWM0ZWFiMzhlOWFlNjRjYzYxMmEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P24r1kZBSzynPRKDdKRkxTEolrPerZd03erNtjXYQJY';
    const [mediaList, setMediaList] = useState([]);
    const [activeTabId, setActiveTabId] = useState('all');
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/all/day', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(async (res) => {
                const data = await res.json();
                console.log("===>>>>> data movie trending:", data);
                const trendingMediaList = data.results.slice(0, 12);
                setMediaList(trendingMediaList);
            });
    }, []);
    return (
        <div className="px-8 py-10 bg-black text-white">
            <div className="flex flex-col items-start gap-4">
                {/* Phần tiêu đề */}
                <p className="text-2xl font-bold">Trending</p>

                {/* Phần danh sách */}
                <ul className="flex items-center justify-start space-x-4 border border-white font-bold rounded-lg px-4 py-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/5">

                    <li className="bg-white text-black px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300">
                        All
                    </li>
                    <li className="text-white px-4 py-2 rounded-full cursor-pointer hover:bg-gray-700">
                        Movies
                    </li>
                    <li className="text-white px-4 py-2 rounded-full cursor-pointer hover:bg-gray-700">
                        TV Shows
                    </li>
                </ul>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr p-4">
                {mediaList.map((media) => (
                    <MovieCard
                        key={media.id}
                        title={media.title}
                        releaseDate={media.release_date}
                        poster={media.poster_path}
                        point={media.vote_average}
                    />
                ))}
            </div>

        </div>
    );
};

export default MediaList;
