import { useParams } from "react-router-dom"
import { CircularProgressBar } from "../components/MediaList/CircularProgressBar"
import { useEffect, useState } from "react";
import { groupBy } from "lodash";


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

    console.log({crews, groupedCrews});

    return (
        
        <div className="relative bg-black text-white">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                    backgroundImage: movieInfo?.backdrop_path
                        ? `url('https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}')`
                        : `url('https://example.com/default-backdrop.jpg')`, // fallback
                }}
            ></div>

            {/* Content Section */}
            <div className="relative flex flex-col lg:flex-row p-4 lg:p-10">
                {/* Movie Poster */}
                <div className="lg:w-1/3 flex justify-center">
                    <img
                        src={
                            movieInfo?.poster_path
                                ? `https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`
                                : "https://example.com/default-poster.jpg"
                        }
                        alt={movieInfo?.title || "Movie Poster"}
                        className="w-72 rounded-lg shadow-lg"
                    />
                </div>

                {/* Movie Details */}
                <div className="lg:w-2/3 flex flex-col justify-center p-4">
                    {/* Title */}
                    <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                        {movieInfo?.title || "Title Not Available"}
                    </h1>

                    {/* Tagline */}
                    <p className="italic text-gray-400 mb-4">
                        {movieInfo?.tagline || ""}
                    </p>

                    {/* Release Date & Genres */}
                    <div className="text-gray-400 text-sm lg:text-base mb-4">
                        <span>Release Date: {movieInfo?.release_date || "N/A"}</span> |{" "}
                        <span>
                            Genres:{" "}
                            {movieInfo?.genres?.map((genre) => genre.name).join(", ") ||
                                "No Genres"}
                        </span>
                    </div>

                    {/* Vote Average */}
                    <CircularProgressBar percent={movieInfo.vote_average} />


                    {/* Overview */}
                    <h2 className="text-xl font-semibold mb-2">Overview</h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        {movieInfo?.overview || "No overview available."}
                    </p>

                    {/* Budget & Revenue */}
                    <div className="text-gray-400 text-sm lg:text-base mb-4">
                        <span>
                            Budget: $
                            {movieInfo?.budget
                                ? movieInfo.budget.toLocaleString()
                                : "N/A"}
                        </span>{" "}
                        |{" "}
                        <span>
                            Revenue: $
                            {movieInfo?.revenue
                                ? movieInfo.revenue.toLocaleString()
                                : "N/A"}
                        </span>
                    </div>

                    {/* Runtime */}
                    <div className="mb-4">
                        <span className="font-semibold">Runtime: </span>
                        {movieInfo?.runtime
                            ? `${movieInfo.runtime} minutes`
                            : "Not Available"}
                    </div>

                    {/* Spoken Languages */}
                    <div className="mb-4">
                        <span className="font-semibold">Languages: </span>
                        {movieInfo?.spoken_languages?.length > 0
                            ? movieInfo.spoken_languages
                                .map((lang) => lang.name)
                                .join(", ")
                            : "N/A"}
                    </div>

                    {/* Homepage */}
{movieInfo?.homepage && (
    <a
        href={movieInfo.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-white hover:text-gray-300 transition duration-300"
    >
        {/* Play Icon */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M7 6v12l10-6z" />
        </svg>
        <span className="font-semibold text-lg">Trailer</span>
    </a>
)}


                </div>
            </div>
        </div>

    )
}
