import {useEffect, useState} from "react";

import '../UI/styles/variables.css'
import '../UI/styles/index.css'

export const FilmsPage = ({genre = 'popular', page = 1}) => {
    const [resultFilms, setResultFilms] = useState({})

    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original/${imgUrl}`

    useEffect(async () => {
        await fetch(`https://api.themoviedb.org/3/movie/${genre}?api_key=da0213edba5ce29d325c43cfec6aeab5&page=${page}`)
            .then(res => res.json())
            .then(data => {
                console.log(`https://api.themoviedb.org/3/movie/${genre}?api_key=da0213edba5ce29d325c43cfec6aeab5&page=${page}`, resultFilms)

                return setResultFilms(data)
            })
    }, [])

    return(
        <section id={'films'}>
            <div className="container">
                <h1>Films Page</h1>
                <div id="films__popular">
                    <div className="films__item">

                        {
                            resultFilms.results.map((el, i) => {
                                return <img src={getBackdropImgLink(el.backdrop_path)} className="d-block w-100" key={el.id} alt="film"/>
                            })
                        }

                        {/*<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">*/}
                        {/*    <div className="carousel-inner">*/}

                                {/*{*/}
                                {/*    popFilms.results.map((el, i) => {*/}
                                {/*        return(*/}
                                {/*            <div></div>*/}
                                {/*            // <div className={'carousel-item ' + i === 0 ? 'active' : ''}>*/}
                                {/*            //     <img src={el.backdrop_path} className="d-block w-100" alt=""/>*/}
                                {/*            // </div>*/}
                                {/*        )*/}
                                {/*    })*/}
                                {/*}*/}

                                {/*</div>*/}
                                {/*<div className="carousel-item">*/}
                                {/*    <img src="" className="d-block w-100" alt=""/>*/}
                                {/*</div>*/}
                                {/*<div className="carousel-item">*/}
                                {/*    <img src="" className="d-block w-100" alt=""/>*/}
                                {/*</div>*/}
                        {/*    </div>*/}
                        {/*    <button className="carousel-control-prev" type="button"*/}
                        {/*            data-bs-target="#carouselExampleControls" data-bs-slide="prev">*/}
                        {/*        <span className="carousel-control-prev-icon" aria-hidden="true"></span>*/}
                        {/*        <span className="visually-hidden">Previous</span>*/}
                        {/*    </button>*/}
                        {/*    <button className="carousel-control-next" type="button"*/}
                        {/*            data-bs-target="#carouselExampleControls" data-bs-slide="next">*/}
                        {/*        <span className="carousel-control-next-icon" aria-hidden="true"></span>*/}
                        {/*        <span className="visually-hidden">Next</span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                    </div>
                </div>
            </div>
        </section>
    )
}