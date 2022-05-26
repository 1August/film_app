import React, {Fragment} from "react"
import {Link} from "react-router-dom"

export const MovieCard = ({el, getBackdropImgLink}) => {
    return (
        <Fragment>
            <Link to={`/movie/${el.id}`}>
                <img
                    alt={el?.title}
                    className="card-img-top"
                    height={'100%'}
                    loading={"lazy"}
                    src={getBackdropImgLink(el?.poster_path || el?.backdrop_path)}
                />
            </Link>
            <div className="movieDescription">
                <h3>
                    {el?.title || el?.original_title}
                </h3>
                <h5 className={'rate'}>
                    {el?.vote_average || 0}
                </h5>
            </div>
        </Fragment>
    )
}