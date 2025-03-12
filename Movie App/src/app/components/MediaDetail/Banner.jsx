import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalContext } from "../../context/ModalProvider";
import { CircularProgressBar } from "../MediaList/CircularProgressBar";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ mediaInfo }) => {
  const { openModal } = useModalContext();

  const handleTrailerClick = () => {
    const trailer = mediaInfo?.videos?.results?.find(
      (video) => video.type === "Trailer"
    );

    const trailerVideoKey = trailer?.key || null;

    const videoUrl = trailerVideoKey
      ? `https://www.youtube.com/embed/${trailerVideoKey}`
      : "https://example.com/default-trailer.mp4";

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
    openModal(modalContent);
  };

  // Kiểm tra nếu dữ liệu chưa sẵn sàng
  const isLoading = !mediaInfo;

  return (
    <div className="relative bg-black text-white">
      {isLoading ? (
        // Skeleton Loader khi đang tải
        <div className="animate-pulse">
          <div className="absolute inset-0 bg-gray-800 opacity-40"></div>
          <div className="relative flex flex-col lg:flex-row p-4 lg:p-10">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-72 h-96 bg-gray-700 rounded-lg"></div>
            </div>
            <div className="lg:w-2/3 flex flex-col justify-center p-4 space-y-4">
              <div className="h-8 w-2/3 bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-600 rounded"></div>
              <div className="h-4 w-full bg-gray-600 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-600 rounded"></div>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-12 bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Nội dung chính khi dữ liệu đã sẵn sàng
        <>
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: mediaInfo?.backdrop_path
                ? `url('https://image.tmdb.org/t/p/original/${mediaInfo.backdrop_path}')`
                : `url('https://example.com/default-backdrop.jpg')`,
            }}
          ></div>

          {/* Content Section */}
          <div className="relative flex flex-col lg:flex-row p-4 lg:p-10">
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

            <div className="lg:w-2/3 flex flex-col justify-center p-4">
              <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                {mediaInfo?.title || "Title Not Available"}
              </h1>
              <p className="italic text-gray-400 mb-4">
                {mediaInfo?.tagline || ""}
              </p>
              <div className="text-gray-400 text-sm lg:text-base mb-4">
                <span>
                  Release Date: {mediaInfo?.release_date || "N/A"}
                </span>{" "}
                |{" "}
                <span>
                  Genres:{" "}
                  {mediaInfo?.genres?.map((genre) => genre.name).join(", ") ||
                    "No Genres"}
                </span>
              </div>
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
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {mediaInfo?.overview || "No overview available."}
              </p>
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
              <div className="mb-4">
                <span className="font-semibold">Runtime: </span>
                {mediaInfo?.runtime
                  ? `${mediaInfo.runtime} minutes`
                  : "Not Available"}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Languages: </span>
                {mediaInfo?.spoken_languages?.length > 0
                  ? mediaInfo.spoken_languages
                      .map((lang) => lang.name)
                      .join(", ")
                  : "N/A"}
              </div>
              {mediaInfo?.homepage && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleTrailerClick}
                    className="flex items-center px-5 py-3 bg-white text-black font-bold rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                  >
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    <span>Watch Trailer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
