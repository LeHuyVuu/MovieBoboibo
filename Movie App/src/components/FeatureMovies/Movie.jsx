
import { Link } from 'react-router-dom';

const Movie = (props) => {

    const { data: { backdrop_path, title, release_date, overview, id } } = props;



    if (!props.data) {
        return null; // Trả về null nếu data không tồn tại
    }


    console.log(props.key)
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} className="aspect-video brightness-50 w-full" />
            <div className="absolute bottom-[20%] left-8 w-1/2 text-white sm:w-1/3">
                <p className="font-extrabold sm:text-[3vw] mb-2">{title}</p>
                <div>
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
                        <Link to={`/movie/${id}`}>
                            <button className="bg-white text-black font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out text-xs lg:text-sm">
                                View Details
                            </button>

                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
