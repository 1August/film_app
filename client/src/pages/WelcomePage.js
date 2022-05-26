import '../UI/styles/welcomePage.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import banner from '../UI/img/movies-poster.jpg'

import template from '../UI/img/movies-poster.jpg'

import spiderMan from '../UI/img/movies/theAmazingSpiderMan.jpg'
import blackAdam from '../UI/img/movies/blackAdam.jpg'
import blackWidow from '../UI/img/movies/blackWidow.jpg'
import joker from '../UI/img/movies/joker.jpg'
import justice from '../UI/img/movies/justice.jpg'
import vivo from '../UI/img/movies/vivo.jpg'
import venom from '../UI/img/movies/venom.jpg'

import {useHttp} from "../hooks/http.hook"

import {MovieCategorySlider} from "../components/MovieCategorySlider"
import {Swiper} from "swiper/react"
import {Autoplay, Lazy, Pagination} from "swiper"
import {MySwiper} from "../components/MySwiper";
import {Loader} from "../components/Loader";

export const WelcomePage = ({genre = 'popular', page = 1}) => {
    // constants
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'
    // const swiperConfig = {
    //     categoryName: '',
    //     slidesPerView: 4.5,
    //     spaceBetween: 25,
    //     loop: true,
    //     pagination: {
    //         dynamicBullets: true
    //     },
    //     modules: [Lazy, Pagination, Autoplay],
    //     coverflowEffect: {
    //         rotate: 50,
    //         stretch: 0,
    //         depth: 100,
    //         modifier: 1,
    //         slideShadows: true,
    //     },
    //     autoplay: {
    //         delay: 8000,
    //         disableOnInteraction: false,
    //     }
    // }

    // own hooks
    const {loading, error, request, clearError} = useHttp()

    // useStates
    const [popularMovies, setPopularMovies] = useState([])

    // useEffects
    useEffect(async () => {
        const tempPopularMovies = []
        const totalPages = 5
        for (let i = 1; i <= totalPages; i++){
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&include_video&page=${i}&language=en-US`
            const data = await request(url)
            // console.log(data.results)
            tempPopularMovies.push(...data.results.filter(el => el.backdrop_path || el.poster_path))
        }
        setPopularMovies(tempPopularMovies)
    }, [])

    /**
     * Returns image URL of background
     * @param imgUrl
     * @returns {`https://image.tmdb.org/t/p/original${string}`}
     */
    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`

    return (
        <div id="welcomePage">
            <section id="banner">
                <div className="container-fluid">
                    <div className="bannerText">
                        <h1>Lorem ipsum dolor sit amet.</h1>
                        <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nihil.</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, iste, iure. At, atque corporis dignissimos dolores earum exercitationem harum maxime modi molestiae molestias obcaecati quisquam quos tenetur vero voluptatem voluptatum?
                        </p>
                    </div>
                    <div className="bannerImg">
                        <img src={banner} alt="Banner"/>
                    </div>
                </div>
            </section>

            <section id="firstInfo">
                <div className="container">
                    <h1>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, repellat.
                    </h1>
                    <h3>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ea nulla, perferendis
                        reiciendis
                        repudiandae ullam?
                    </h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur atque consequatur cum ea esse explicabo hic id in ipsa modi optio possimus praesentium, sapiente sed vel vero voluptates voluptatum?</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium aperiam assumenda consequatur corporis ex iusto natus officia voluptate voluptatem! Amet, aut blanditiis commodi debitis deleniti dicta dignissimos ducimus facere fugiat magnam, nesciunt odio provident quaerat quam quas quasi quisquam sequi sint totam unde vel veniam vitae voluptate? Dolorum, reprehenderit?
                    </p>
                    <img src={joker} alt="starter"/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aspernatur beatae
                        cum distinctio
                        ducimus eius, eligendi, esse exercitationem illo inventore ipsam libero minima officiis
                        placeat rem
                        rerum sunt suscipit voluptate voluptatibus! Adipisci dolor ducimus eius eos hic id inventore
                        ipsum iure
                        minus, non officiis optio quia quibusdam quod vero?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aliquid architecto
                        autem beatae cum debitis deleniti eius enim et ex facere id illo ipsum iste laboriosam magni
                        minima molestiae nemo nihil nostrum numquam officiis placeat quae, quam quas quo recusandae
                        reiciendis repellat repellendus sequi sint vero voluptas. Autem consequatur eos impedit
                        itaque quisquam. Consequuntur distinctio eos error hic itaque pariatur possimus quae sint
                        vitae.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus beatae consequatur culpa
                        deserunt dolores doloribus dolorum earum et fugiat ipsam iste, necessitatibus nisi obcaecati
                        omnis reprehenderit tempora voluptas voluptatem voluptatibus.
                    </p>
                </div>
            </section>
            <div className="delimiter"/>

            <section className="cardsSection">
                <div className="container">
                    <h1>Top movies</h1>
                    {
                        loading
                            ? <Loader/>
                            : popularMovies.length !== 0
                                ? <MySwiper
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                    getBackdropImgLink={getBackdropImgLink}
                                >
                                    {popularMovies}
                                </MySwiper>
                                : error ? error.message || <h1>Error</h1> : <h1>Empty</h1>
                    }
                </div>
            </section>

            <section id="articlesSection">
                <div className="container">
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, perspiciatis?</h3>
                    <div className="articles">
                        <div className="article">
                            <div className="articleText">
                                <h1>Lorem ipsum dolor sit amet.</h1>
                                <h3>Lorem ipsum dolor sit amet, consectetur adipisicing.</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam amet assumenda
                                    deleniti, dignissimos magni nemo nulla placeat praesentium quae quaerat quas
                                    quisquam quos similique sint unde voluptatem. Debitis, suscipit?
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quo totam vero
                                    voluptates. A ab alias aliquam animi aperiam assumenda, aut blanditiis deleniti eius
                                    error eum, facere id illum inventore ipsa laborum, libero maxime modi nam odio quam
                                    quod reiciendis sapiente sequi sit temporibus ut veritatis vitae voluptate
                                    voluptatem voluptatum!
                                </p>
                            </div>
                            <div className="articleImg">
                                <img src={blackWidow} alt="movie info" />
                            </div>
                        </div>
                        <div className="article">
                            <div className="articleText">
                                <h1>Lorem ipsum dolor sit amet.</h1>
                                <h3>Lorem ipsum dolor sit amet, consectetur adipisicing.</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam amet assumenda
                                    deleniti, dignissimos magni nemo nulla placeat praesentium quae quaerat quas
                                    quisquam quos similique sint unde voluptatem. Debitis, suscipit?
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quo totam vero
                                    voluptates. A ab alias aliquam animi aperiam assumenda, aut blanditiis deleniti eius
                                    error eum, facere id illum inventore ipsa laborum, libero maxime modi nam odio quam
                                    quod reiciendis sapiente sequi sit temporibus ut veritatis vitae voluptate
                                    voluptatem voluptatum!
                                </p>
                            </div>
                            <div className="articleImg">
                                <img src={vivo} alt="movie info" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}