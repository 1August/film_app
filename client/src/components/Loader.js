import loader from '../UI/img/loader.gif'

import '../UI/styles/loader.css'

export const Loader = () => {
    return(
        <section id={'loader'}>
            <div className="container">
                <div className="loaderGIF">
                    <img src={loader} alt="Loading..."/>
                </div>
            </div>
        </section>
    )
}