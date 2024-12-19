import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalContext } from "../../context/ModalProvider"
import { CircularProgressBar } from "../MediaList/CircularProgressBar"
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ mediaInfo }) => {
    const { openModal } = useModalContext();
    const handleTrailerClick = () => {
        const trailer = mediaInfo?.videos?.results?.find(
            (video) => video.type === "Trailer"
        );

        // Nếu tìm thấy trailer, tạo URL YouTube
        const trailerVideoKey = trailer?.key || null;

        const videoUrl = trailerVideoKey
            ? `https://www.youtube.com/embed/${trailerVideoKey}`
            : "https://example.com/default-trailer.mp4"; // Fallback nếu không có trailer
        const modalContent = (
            <div className="w-full max-w-6xl mx-auto h-[500px] rounded-lg overflow-hidden">
                <iframe
                    src={videoUrl}
                    title="Trailer"
                    allow="autoplay; fullscreen"
                    className="w-full h-full"
                ></iframe>
            </div>


        );
        openModal(modalContent); // Hiển thị modal với nội dung video
    };
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
                    <CircularProgressBar
                        percent={Math.round(mediaInfo.vote_average * 10)}
                        strokeColor={
                            mediaInfo.vote_average >= 7
                                ? "green"
                                : mediaInfo.vote_average >= 5
                                    ? "orange"
                                    : "red"
                        }
                    />



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
                        <div className="flex items-center space-x-4">

                            {/* Trailer Button */}
                            <button
                                onClick={handleTrailerClick}
                                className="flex items-center px-5 py-3 bg-white text-black font-bold rounded-lg shadow-md transition-transform duration-300 ease-in-out  hover:-translate-y-1 hover:shadow-lg"
                            >
                                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                <span>Watch Trailer</span>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>

    )
}

export default Banner