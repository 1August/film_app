import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const MoviePage = () => {
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'

    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`

    const getMovieReqById = movieId => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    const [currentMovie, setCurrentMovie] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        fetch(getMovieReqById(id))
            .then(res => res.json())
            .then(data => {
                setCurrentMovie(data)
                console.log(data)
            })
    }, [])


    if (currentMovie){
        return (
            <section className={'moviePage'}>

                <div className="container">
                    <h1>
                        {currentMovie?.title}
                    </h1>
                    <h3>
                        {currentMovie?.overview}
                    </h3>
                    <img src={getBackdropImgLink(currentMovie.backdrop_path)} alt=""/>
                </div>
            </section>
        )
    }

    return(
        <section className={'moviePage'}>
            <div className="container">
                <h1>Movie Page</h1>
            </div>
        </section>
    )
}