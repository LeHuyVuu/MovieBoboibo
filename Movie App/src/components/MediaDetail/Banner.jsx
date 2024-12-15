import { CircularProgressBar } from "../MediaList/CircularProgressBar"

const Banner = ({mediaInfo}) => {
    return (


        <div className="relative bg-black text-white">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                    backgroundImage: mediaInfo?.backdrop_path
                        ? `url('https://image.tmdb.org/t/p/original/${mediaInfo.backdrop_path}')`
                        : `url('https://example.com/default-backdrop.jpg')`, // fallback
                }}
            ></div>

            {/* Content Section */}
            <div className="relative flex flex-col lg:flex-row p-4 lg:p-10">
                {/* Movie Poster */}
                <div className="lg:w-1/3 flex justify-center">
                    <img
                        src={
                            mediaInfo?.poster_path
                                ? `https://image.tmdb.org/t/p/original/${mediaInfo.poster_path}`
                                : "https://example.com/default-poster.jpg"
                        }
                        alt={mediaInfo?.title || "Movie Poster"}
                        className="w-72 rounded-lg shadow-lg"
                    />
                </div>

                {/* Movie Details */}
                <div className="lg:w-2/3 flex flex-col justify-center p-4">
                    {/* Title */}
                    <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                        {mediaInfo?.title || "Title Not Available"}
                    </h1>

                    {/* Tagline */}
                    <p className="italic text-gray-400 mb-4">
                        {mediaInfo?.tagline || ""}
                    </p>

                    {/* Release Date & Genres */}
                    <div className="text-gray-400 text-sm lg:text-base mb-4">
                        <span>Release Date: {mediaInfo?.release_date || "N/A"}</span> |{" "}
                        <span>
                            Genres:{" "}
                            {mediaInfo?.genres?.map((genre) => genre.name).join(", ") ||
                                "No Genres"}
                        </span>
                    </div>

                    {/* Vote Average */}
                    <CircularProgressBar percent={mediaInfo.vote_average} />


                    {/* Overview */}
                    <h2 className="text-xl font-semibold mb-2">Overview</h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        {mediaInfo?.overview || "No overview available."}
                    </p>

                    {/* Budget & Revenue */}
                    <div className="text-gray-400 text-sm lg:text-base mb-4">
                        <span>
                            Budget: $
                            {mediaInfo?.budget
                                ? mediaInfo.budget.toLocaleString()
                                : "N/A"}
                        </span>{" "}
                        |{" "}
                        <span>
                            Revenue: $
                            {mediaInfo?.revenue
                                ? mediaInfo.revenue.toLocaleString()
                                : "N/A"}
                        </span>
                    </div>

                    {/* Runtime */}
                    <div className="mb-4">
                        <span className="font-semibold">Runtime: </span>
                        {mediaInfo?.runtime
                            ? `${mediaInfo.runtime} minutes`
                            : "Not Available"}
                    </div>

                    {/* Spoken Languages */}
                    <div className="mb-4">
                        <span className="font-semibold">Languages: </span>
                        {mediaInfo?.spoken_languages?.length > 0
                            ? mediaInfo.spoken_languages
                                .map((lang) => lang.name)
                                .join(", ")
                            : "N/A"}
                    </div>

                    {/* Homepage */}
                    {mediaInfo?.homepage && (
                        <a
                            href={mediaInfo.homepage}
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

export default Banner