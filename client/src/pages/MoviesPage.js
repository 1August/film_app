// Hooks
import {useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook"

// Components
import {MovieCategorySlider} from "../components/MovieCategorySlider"

// Styles
import '../UI/styles/variables.css'
import '../UI/styles/welcomePage.css'
import {Loader} from "../components/Loader";

export const MoviesPage = () => {
    // Constants
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'
    const categoriesRequest = ["popularity.desc", "release_date.asc", "revenue.desc", "vote_count.desc"]

    // Own hooks implementation
    const {loading, error, request, clearError} = useHttp()

    // Vars to save data after useEffect
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [detailedMovies, setDetailedMovies] = useState({})

    // useEffects
    /**
     * On loading page gets film ids. Saves it to detailedMovies var
     */
    useEffect(async () => {
        const resMovieIds = []

        // Get movies by addition categories
        // const totalPages = 1
        // for (let i = 1; i <= totalPages; i++) {
        //     const additionMovies = await getAdditionMovies(i)
        //
        //     for (const entry of Object.entries(additionMovies)) {
        //         await entry[1].results.forEach(movie => {
        //             if (!resMovieIds[entry[0]]) resMovieIds[entry[0]] = []
        //             resMovieIds[entry[0]].push(movie)
        //         })
        //     }
        // }

        /**
         * Get movies by genre
         */
        await requestMovieAPI(`genre/movie/list`).then(async data => {
            const extraGenres = [
                'TV Movie', 'Western', 'War', 'Science Fiction'
            ]

            const filteredData = data.genres.filter(el => !extraGenres.includes(el.name))

            for (const genre of filteredData) {
                const genreName = genre.name.toLowerCase()
                await requestMovieAPI(`discover/movie/`, null, `&with_genres=${genre.id}`)
                    .then(data => {
                        data.results.forEach(film => {
                            if (film?.poster_path || film?.backdrop_path) {
                                if (!resMovieIds[genreName]) resMovieIds[genreName] = []
                                resMovieIds[genreName].push({...film, genreId: genre.id})
                            }
                        })
                    })
            }
        })

        // Get movies by sortName request
        // for (const sortName in categoriesRequest) {
        //     const data = await requestMovieAPI(`discover/movie?api_key=${API_KEY}&sort_by=${categoriesRequest[sortName]}`)
        //     const objKey = [categoriesRequest[sortName].slice(0, sortName.indexOf('.'))]
        //     if (!resMovieIds[objKey]) resMovieIds[objKey] = []
        //     data.results.forEach(film => resMovieIds[objKey].push(film))
        // }

        setDetailedMovies(resMovieIds)
        setAllDataLoaded(true)
    }, [])

    /**
     * logs detailedMovies after loading data from API
     */
    // useEffect(() => {
    //     console.log('Movie details', detailedMovies)
    // Object.entries(detailedMovies).map(entries => {
    //     entries[1].map(el => {
    //         console.log(el)
    //     })
    // })
    // }, [detailedMovies])

    // useMemo
    // useMemo(() => getMoviesByGenre, input);

    // Functions
    /**
     * Get movies by blocks of genres
     * @param movieId
     * @returns {`https://api.themoviedb.org/3/movie/${string}?api_key=da0213edba5ce29d325c43cfec6aeab5&append_to_response=videos`}
     */
    const getMovieReqById = movieId => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`

    /**
     * Gets another genres/categories of movies
     * @return {Promise<{now_playing: *, top_rated: *, popular: *, upcoming: *}>}
     */
    // const getAdditionMovies = async (page = 1) => ({
    //     upcoming: await requestMovieAPI(`movie/upcoming`, page),
    //     popular: await requestMovieAPI(`movie/popular`, page),
    //     now_playing: await requestMovieAPI(`movie/now_playing`, page),
    //     top_rated: await requestMovieAPI(`movie/top_rated`, page)
    // })

    /**
     * Request TMDB API to get data
     * @param requestUrl
     * @param page
     * @param additionRequest
     * @return {Promise<*>}
     */
    const requestMovieAPI = async (requestUrl, page = 1, additionRequest = '') => {
        const url = `https://api.themoviedb.org/3/${requestUrl}?api_key=${API_KEY}&language=en-US&page=${page}${additionRequest}`
        return await request(url)
    }

    /**
     * Returns image URL of background
     * @param imgUrl
     * @returns {`https://image.tmdb.org/t/p/original${string}`}
     */
    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`

    return <section id="filmsPage">
        <div className="container">
            {
                loading
                    ? <Loader/>
                    : Object.entries(detailedMovies).length !== 0 && allDataLoaded ?
                        Object.entries(detailedMovies).map(entries => {
                            return <MovieCategorySlider
                                categoryName={entries[0]}
                                className="mySwiper"
                                genreId={Object.values(entries[1])[0].genreId}
                                getBackdropImgLink={getBackdropImgLink}
                                key={entries[0]}
                            >
                                {entries[1]}
                            </MovieCategorySlider>
                        }, [])
                        : error ? error.message || <h1>Error</h1> : <h1>Empty</h1>
            }
        </div>
    </section>
}