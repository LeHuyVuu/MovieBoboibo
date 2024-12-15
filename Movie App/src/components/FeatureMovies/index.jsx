import PaginateIndicator from './PaginateIndicator'
import Movie from './Movie'
import { useEffect, useState } from 'react';
//

const FeatureMovies = () => {
    const [movies, setMovies] = useState([]);
    const [activeMovieId, setActiveMovieId] = useState();

    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDk3NDIwMDlmZTM4ZTUxYWE5Zjc4YjkxNDdjMzZjMyIsIm5iZiI6MTczNDEwMjY5OS40MjksInN1YiI6IjY3NWM0ZWFiMzhlOWFlNjRjYzYxMmEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P24r1kZBSzynPRKDdKRkxTEolrPerZd03erNtjXYQJY';

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(async (res) => {
                const data = await res.json();
                console.log("===>>>>> data:", data);
                const popularMovies = data.results.slice(0, 4);
                setMovies(popularMovies);
                // Set activeMovieId ban đầu
                setActiveMovieId(popularMovies[0].id);

                // Tạo interval để tự động chuyển movie mỗi 5 giây
                const intervalId = setInterval(() => {
                    setActiveMovieId((prevId) => {
                        const currentIndex = popularMovies.findIndex(movie => movie.id === prevId);
                        const nextIndex = (currentIndex + 1) % popularMovies.length;  // Quay lại đầu nếu đến cuối
                        return popularMovies[nextIndex].id;
                    });
                }, 20000);

                // Cleanup: Clear interval khi component unmount hoặc khi movie list thay đổi
                return () => clearInterval(intervalId);
            });
    }, []);
    // console.log("Movie after handling:", JSON.stringify(movies, 0, 3));

    

    return (
        <div className="relative">
            {
                movies.filter((movie) => movie.id === activeMovieId).map(movie => <Movie key={movie.id} data={movie} />)
            }
       


            <PaginateIndicator movies={movies} activeMovieId={activeMovieId} setActiveMovieId={setActiveMovieId} />
        </div>
    );
};

export default FeatureMovies;
