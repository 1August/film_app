import {Fragment} from "react"

import {MovieCard} from "./MovieCard"

import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay, Lazy, Pagination} from "swiper"

// import '../UI/styles/mySwiper.css'

export const MySwiper = ({children, getBackdropImgLink, ...props}) => {
    const {
        slidesPerView = 4.5,
        spaceBetween = 40,
        loop = true,
        pagination = {
            dynamicBullets: true
        },
        modules = [Lazy, Pagination, Autoplay],
        coverflowEffect = {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        autoplay = {
            delay: 8000,
            disableOnInteraction: false,
        }
    } = props

    return(
        <Fragment>
            <Swiper
                autoplay={autoplay}
                centeredSlides={true}
                className="mySwiper"
                coverflowEffect={coverflowEffect}
                lazy={true}
                loop={loop}
                modules={modules}
                pagination={pagination}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
            >
                {children.map(el => <SwiperSlide key={el.id}>
                    <MovieCard el={el} getBackdropImgLink={getBackdropImgLink}/>
                </SwiperSlide>)}
            </Swiper>
        </Fragment>
    )
}