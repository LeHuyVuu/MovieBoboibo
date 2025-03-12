import { useState } from "react";
import { MovieCard } from "./MovieCard";
import useFetch from "../../hooks/useFetch";

const MediaList = ({ TABS, Title }) => {

    const [activeTabId, setActiveTabId] = useState(TABS[0]?.id);

    const url = TABS.find(tab => tab.id === activeTabId)?.url
    const { data } = useFetch({ url })
    const mediaList = (data.results || []).slice(0, 12);
    console.log({ mediaList });

    const handleTabChange = (tabId) => {
        setActiveTabId(tabId);
        localStorage.setItem("activeTabId", tabId);
    };


    return (
        <div className="px-8 py-10 bg-black text-white">
            <div className="flex flex-col items-start gap-4">
                {/* Phần tiêu đề */}
                <p className="text-2xl font-bold">{Title}</p>
                {/* Phần danh sách */}
                <ul className="flex items-center justify-start space-x-2 rounded-full px-2 py-1 w-full sm:w-3/4 md:w-2/3 lg:w-1/4 xl:w-1/4 2xl:w-1/5 bg-black">
                    {TABS.map((tabItem) => (
                        <li
                            onClick={() => handleTabChange(tabItem.id)}
                            key={tabItem.id}
                            className={`px-4 sm:px-6 lg:px-8 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out text-xs sm:text-sm md:text-base lg:text-lg text-center whitespace-nowrap ${tabItem.id === localStorage.getItem("activeTabId")
                                ? "bg-white text-black hover:bg-gray-300 shadow-md" // Tab được chọn
                                : "bg-gray-800 text-white hover:bg-gray-600" // Tab không được chọn
                                }`}
                        >
                            {tabItem.name}
                        </li>

                    ))}
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
                        mediaType={media.media_type}
                    />
                ))}
            </div>

        </div>
    );
};

export default MediaList;
