import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

const MediaList = ({ TABS, Title }) => {
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDk3NDIwMDlmZTM4ZTUxYWE5Zjc4YjkxNDdjMzZjMyIsIm5iZiI6MTczNDEwMjY5OS40MjksInN1YiI6IjY3NWM0ZWFiMzhlOWFlNjRjYzYxMmEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P24r1kZBSzynPRKDdKRkxTEolrPerZd03erNtjXYQJY';
    const [mediaList, setMediaList] = useState([]);
    const [activeTabId, setActiveTabId] = useState(TABS[0]?.id);

    useEffect(() => {
        const url = TABS.find(tab => tab.id === activeTabId)?.url
        if (url) {
            fetch(url, {
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
        }
    }, [activeTabId]);

    

    return (
        <div className="px-8 py-10 bg-black text-white">
            <div className="flex flex-col items-start gap-4">
                {/* Phần tiêu đề */}
                <p className="text-2xl font-bold">{Title}</p>

                {/* Phần danh sách */}
                <ul className="flex items-center justify-start space-x-4 border border-white font-bold rounded-lg px-4 py-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/5">
                    {
                        TABS.map((tabItem) => (
                            <li
                                onClick={() => {
                                    setActiveTabId(tabItem.id);
                                }}
                                key={tabItem.id}
                                className={`px-4 py-2 rounded-full cursor-pointer ${tabItem.id === 'all'
                                    ? 'bg-white text-black hover:bg-gray-300'
                                    : 'bg-black text-white hover:bg-gray-700'
                                    }`}
                            >
                                {tabItem.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr p-4">
                {mediaList.map((media) => (
                    <MovieCard
                        id={media.id}
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
