import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { groupBy } from "lodash";
import Banner from "../components/MediaDetail/Banner";
import ActorList from "../components/MediaDetail/ActorList";
import RelatedMovieList from "../components/MediaDetail/RelatedMovieList";
import InfomationMedia from "../components/MediaDetail/InfomationMedia";


export const MovieDetail = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState();
    const [movieRelated, setMovieRelated] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
            }
        })
            .then(async (res) => {
                const data = await res.json();
                console.log("***  ID here: " + id);
                console.log("===>>>>> data movie :", data);
                setMovieInfo(data);
            });

    }, [id]);


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                 'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
            }
        })
            .then(async (res) => {
                const data = await res.json();
                console.log({ recommendation: data })
                const relatedMovie = (data.results || []).slice(0, 12);
                setMovieRelated(relatedMovie);

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
                <div className="flex-[1]">
                    <InfomationMedia information={movieInfo}/>
                </div>

            </div>
            <div>
                <RelatedMovieList mediaList={movieRelated} />
            </div>
        </div>
    )
}
