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

export const WelcomePage = ({genre = 'popular', page = 1}) => {

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
            <div className="delimiter"></div>

            <section className="cardsSection">
                <div className="container">
                    <h1>Top movies</h1>
                    <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, harum.</h3>
                    <div className="cards">
                        <div className="card">
                            <div className="cardImg">
                                <img src={venom} alt="card" />
                            </div>
                            <div className="cardText">
                                <div className="textPart">
                                    <h3>Lorem ipsum dolor sit.</h3>
                                    <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at blanditiis
                                        doloribus ex ipsam, magni nemo nobis nostrum placeat quisquam quo quod recusandae
                                        saepe temporibus unde. Dicta tenetur ut voluptates.</p>
                                </div>
                                <a href="#">See more</a>
                            </div>
                        </div>
                        <div className="card">
                            <div className="cardImg">
                                <img src={blackAdam} alt="card" />
                            </div>
                            <div className="cardText">
                                <div className="textPart">
                                    <h3>Lorem ipsum dolor sit.</h3>
                                    <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda, beatae
                                        consequuntur corporis dolorem ex facere laborum molestias omnis, perspiciatis quos
                                        tempora veritatis voluptatum? Alias distinctio dolorem illum inventore laboriosam
                                        natus optio quisquam voluptatum? Adipisci aliquid, at atque exercitationem illo
                                        iusto maiores maxime necessitatibus neque obcaecati possimus provident quis
                                        voluptatum!</p>
                                </div>
                                <a href="#">See more</a>
                            </div>
                        </div>
                        <div className="card">
                            <div className="cardImg">
                                <img src={spiderMan} alt="card" />
                            </div>
                            <div className="cardText">
                                <div className="textPart">
                                    <h3>Lorem ipsum dolor sit.</h3>
                                    <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum deserunt eos ipsum
                                        nulla quaerat quod totam ut vitae! Alias aspernatur consectetur cupiditate dolores
                                        error, explicabo facilis, harum perspiciatis quasi quod repellendus sed soluta
                                        tenetur! Corporis deserunt doloremque excepturi harum quam!</p>
                                </div>
                                <a href="#">See more</a>
                            </div>
                        </div>
                    </div>
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