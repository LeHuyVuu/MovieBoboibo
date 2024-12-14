import { CircularProgressBar } from "./CircularProgressBar"


export const MovieCard = ({ title, releaseDate, poster, point }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg bg-black text-white hover:scale-105 transform transition duration-300 ease-in-out">
      <img
        src={`https://image.tmdb.org/t/p/original${poster}`}
        alt={title}
        className="h-96 w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800 to-gray-900 opacity-90">

        <div className="absolute bottom-4 left-4">
          <CircularProgressBar
            percent={Math.round(point * 10)} // Tính phần trăm
            strokeColor={
              point >= 7
                ? "green"
                : point >= 5
                  ? "orange"
                  : "red"
            }
          />

          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-400 text-sm">{releaseDate}</p>
        </div>
      </div>
    </div>
  );
};

