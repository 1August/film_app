import {Link} from "react-router-dom"

import {MySwiper} from "./MySwiper"

import '../UI/styles/mySwiper.css'

export const MovieCategorySlider = ({getBackdropImgLink, children, ...props}) => {
    const {categoryName, genreId} = props

    return (
        <div>
            <h1>
                <Link
                    to={`/movies/${
                        categoryName.indexOf('.') !== -1
                            ? categoryName.slice(0, categoryName.indexOf('.'))
                            : categoryName
                    }&id=${genreId}`}
                >
                    {
                        categoryName.split('_')
                            .map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
                            .join(' ')
                    }
                </Link>
            </h1>
            <MySwiper getBackdropImgLink={getBackdropImgLink} props={props}>
                {children}
            </MySwiper>
        </div>
    )
}


// <SwiperSlide key={el.id}>
//     <Link to={`/movie/${el.id}`}>
//         <img
//             alt={el?.title}
//             className="card-img-top"
//             height={'100%'}
//             loading={"lazy"}
//             src={getBackdropImgLink(el?.poster_path || el?.backdrop_path)}
//         />
//     </Link>
//     <div className="movieDescription">
//         <h3>
//             { el?.title || el?.original_title }
//         </h3>
//         <h5 className={'rate'}>
//             { el?.vote_average || 0 }
//         </h5>
//     </div>
// </SwiperSlide>