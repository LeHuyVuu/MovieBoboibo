import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Movie = (props) => {
    console.log({ props });

    if (!props.data) {
        return null; // Trả về null nếu data không tồn tại
    }

    const { data: { backdrop_path, title, release_date, overview } } = props;

    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} className="aspect-video brightness-50" />
            <div className="absolute bottom-[20%] left-8 w-1/2 text-white sm:w-1/3">
                <p className="font-extrabold sm:text-[3vw] mb-2">{title}</p>
                <div>
                    <p className="text-gray-400 border border-gray-400 inline-block p-1 mb-1">PG13</p>
                    <p className="text-[1.3vw] font-bold">{release_date}</p>
                </div>
                <div>
                    <div className="hidden sm:block text-[1.2vw] mb-3 mt-4">
                        <p className="font-bold mb-2">Overview</p>
                        <p>
                            {overview}
                        </p>
                    </div>
                    <div className="mt-4">
                        <button className="bg-white text-black py-2 px-4 rounded me-3 text-[10px] lg: text-sm">
                            <FontAwesomeIcon icon={faPlay} />Trailer
                        </button>
                        <button className='bg-slate-300/55 text-white py-2 px-4 rounded me-3 text-[10px] lg: text-sm'>View detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
