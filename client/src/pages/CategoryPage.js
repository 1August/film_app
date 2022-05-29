import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {MovieCard} from "../components/MovieCard";

import '../UI/styles/categoryPage.css'
import {Loader} from "../components/Loader";

export const CategoryPage = () => {
    // Constants
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'

    /**
     * Get current category name
     * @type {Location<LocationState>}
     */
        // const location = useLocation()
    const {categoryURL} = useParams()
    const categoryId = categoryURL.slice(categoryURL.lastIndexOf('&') + 1)
    const categoryName = categoryURL.slice(0, categoryURL.lastIndexOf('&'))
    // const categoryNameNormalized = categoryName[0].toUpperCase() + categoryName.substring(1).toLowerCase()

    /**
     * Current page all movies list
     */
    const [moviesList, setMoviesList] = useState([])

    /**
     * useHttp hook
     */
    const {loading, error, request, clearError} = useHttp()

    /**
     * fetching to get movies page 1
     */
    useEffect(async () => {
        const res = []
        const totalPages = 10

        for (let i = 1; i <= totalPages; i++) {
            // Get movies by genre
            const url = `https://api.themoviedb.org/3/discover/movie/?api_key=${API_KEY}&language=en-US&with_genres=${categoryId}&page=${i}`
            const data = await request(url)
            data.results.forEach(el => res.push(el))
        }

        setMoviesList(res)
    }, [])

    /**
     * Returns image URL of background
     * @param imgUrl
     * @returns {`https://image.tmdb.org/t/p/original${string}`}
     */
    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`

    return <section id={'categoryPage'}>
        <div className="container">
            {
                loading
                    ? <Loader/>
                    : moviesList.length !== 0
                        ? <>
                            <h2>{categoryName.substring(0, 1).toUpperCase() + categoryName.substring(1).toLowerCase()}</h2>
                            <div className="cardsList">
                                {
                                    moviesList.map((el, i) => {
                                        return (
                                            <div className="card" key={el.id}>
                                                <MovieCard el={el} getBackdropImgLink={getBackdropImgLink}
                                                           key={`${i}-${el.id}`}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                        : error ? error.message || <h1>Error</h1> : <h1>Empty</h1>
            }
        </div>
    </section>
}