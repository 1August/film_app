import {useEffect, useState} from "react"
import {Link} from "react-router-dom"

import '../UI/styles/variables.css'
import '../UI/styles/welcomePage.css'

export const FilmsPage = ({genre = 'popular', page = 1}) => {
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'
    const [resultFilms, setResultFilms] = useState(null)
    const [movieLinks, setMovieLinks] = useState([])

    const getMovieReqById = movieId => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`

    const getMovieList = movieId => {
        const linkEl = movieLinks.find(el => el.id === movieId)
        return (
            <div key={movieId}>
                {/*<img src={linkEl?.image ? getBackdropImgLink(linkEl.image) : ''} className={'w-100'} alt="film"/>*/}
                {/*<a href={linkEl?.link ? `https://www.youtube.com/watch?v=${linkEl.link}` : '/#'}*/}
                {/*   target={'_blank'}>{linkEl?.title || 'Watch'}</a>*/}

                <div>
                    <Link to={`/movie/${linkEl?.id}`}>
                        <img src={linkEl?.image ? getBackdropImgLink(linkEl.image) : ''} className="card-img-top"
                             alt="Film poster"/>
                    </Link>
                    {/*<a href={linkEl?.link ? `https://www.youtube.com/watch?v=${linkEl.link}` : '/#'} className="btn btn-primary" target={'_blank'}>*/}
                    {/*    <img src={linkEl?.image ? getBackdropImgLink(linkEl.image) : ''} className="card-img-top" alt="Film poster" />*/}
                    {/*</a>*/}

                    {/*<div className="card-body">*/}
                    {/*    <h5 className="card-title">{linkEl?.title || 'Unknown'}</h5>*/}
                    {/*    <p className="card-text">*/}
                    {/*        Some quick example text to build on the card title and make up the*/}
                    {/*        bulk of the card's content.*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }

    //  On loading page gets films
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${genre}?api_key=${API_KEY}&page=${page}`)
            .then(res => res.json())
            .then(data => setResultFilms(data))

        // popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc,
        // primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc,
        // vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
        let sortBy = 'vote_average.desc'
        let includeVideo = true
        let year = 2020

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}${includeVideo ? '&include_video' : ''}&page=${page}&year=${year}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }, [page, genre])

    //  Sets movies links after setting films
    useEffect(() => {
        if (resultFilms) {
            for (const el of resultFilms.results) {
                fetch(getMovieReqById(el.id))   //  get every movie by ID
                    .then(res => res.json())
                    .then(data => {
                        const newLink = {
                            id: data.id || '0000',
                            title: data.title || data.original_title,
                            link: data.videos.results[0]?.key || data.videos.results[1]?.key,
                            image: data.backdrop_path || data.poster_path
                        }
                        movieLinks.push(newLink)
                        setMovieLinks([...movieLinks])
                    })
            }
        }
    }, [resultFilms])

    return (
        <section id="filmsPage">
            <div className="container">
                {
                    resultFilms && movieLinks ?
                        resultFilms.results.map(el => {
                            return (
                                <div className={'col'} key={el.id}>
                                    {getMovieList(el.id)}
                                </div>
                            )
                        }) :
                        (<h1>...Loading</h1>)
                }
            </div>
        </section>
    )
}



/*
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'
    const [resultFilms, setResultFilms] = useState(null)
    const [movieLinks, setMovieLinks] = useState([])

    const getMovieReqById = movieId => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`

    const getMovieList = movieId => {
        const linkEl = movieLinks.find(el => el.id === movieId)
        return (
            <div key={movieId}>
                <img src={linkEl?.image ? getBackdropImgLink(linkEl.image) : ''} className={'w-100'} alt="film"/>
                <a href={linkEl?.link ? `https://www.youtube.com/watch?v=${linkEl.link}` : '/#'} target={'_blank'}>{linkEl?.title || 'Watch'}</a>
            </div>
        )
    }

    //  On loading page gets films
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${genre}?api_key=${API_KEY}&page=${page}`)
            .then(res => res.json())
            .then(data => setResultFilms(data))
    }, [page, genre])

    //  Sets movies links after setting films
    useEffect(() => {
        if (resultFilms){
            for (const el of resultFilms.results){
                fetch(getMovieReqById(el.id))   //  get every movie by ID
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        const newLink = {
                            id: data.id,
                            title: data.title || data.original_title,
                            link: data.videos.results[0]?.key || data.videos.results[1]?.key,
                            image: data.backdrop_path || data.poster_path
                        }
                        movieLinks.push(newLink)
                        setMovieLinks([...movieLinks])
                    })
            }
        }
    }, [resultFilms])

    if (resultFilms && movieLinks) {
        return (
            <div className={'container'}>
                {resultFilms.results.map(el => getMovieList(el.id))}
            </div>
        )
    }

    return (
        <div className={'container'}>
            <h1>Loading...</h1>
        </div>
    )
*/