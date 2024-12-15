import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { groupBy } from "lodash";
import Banner from "../components/MediaDetail/Banner";
import ActorList from "../components/MediaDetail/ActorList";


export const MovieDetail = () => {
    const { id } = useParams();
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDk3NDIwMDlmZTM4ZTUxYWE5Zjc4YjkxNDdjMzZjMyIsIm5iZiI6MTczNDEwMjY5OS40MjksInN1YiI6IjY3NWM0ZWFiMzhlOWFlNjRjYzYxMmEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P24r1kZBSzynPRKDdKRkxTEolrPerZd03erNtjXYQJY';
    const [movieInfo, setMovieInfo] = useState();
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(async (res) => {
                const data = await res.json();
                console.log("***  ID here: " + id);
                console.log("===>>>>> data movie :", data);
                setMovieInfo(data);
            });

    }, [id]);
    if (!movieInfo) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="relative flex flex-col items-center justify-center">
                    {/* Vòng tròn xoay */}
                    <div className="h-16 w-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    {/* Chữ Loading */}
                    <p className="text-white mt-4 text-lg font-semibold animate-pulse">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    const crews = (movieInfo.credits?.crew || [])
        .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
        .map((crew) => ({
            id: crew.id,
            job: crew.job,
            name: crew.name
        }));
    const groupedCrews = groupBy(crews, "job");
    console.log({ crews, groupedCrews });
    return (
        <div>
            <Banner mediaInfo={movieInfo} />
            <div className="flex bg-black text-gray-500 flex-col lg:flex-row gap-10 p-8">
                <div className="flex-[2]">
                    <ActorList actors={movieInfo.credits?.cast || []} />
                </div>
                <div className="flex-[1] p-8 bg-black-800 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4 border-b-2 border-gray-600 inline-block">
                        Information
                    </h2>
                    <ul className="space-y-4 text-gray-400">
                        <li>
                            <span className="font-semibold text-gray-200">Original Name:</span> House of the Dragon
                        </li>
                        <li>
                            <span className="font-semibold text-gray-200">Original Country:</span> 🇺🇸 United States
                        </li>
                        <li>
                            <span className="font-semibold text-gray-200">Status:</span> Returning Series
                        </li>
                        <li className="flex items-center">
                            <span className="font-semibold text-gray-200 mr-2">Network:</span>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_logo.svg"
                                alt="HBO Logo"
                                className="h-6"
                            />
                        </li>
                    </ul>
                </div>

            </div>
        </div>

    )
}
