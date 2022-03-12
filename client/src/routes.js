import {WelcomePage} from "./pages/WelcomePage"
import {Route, Routes} from "react-router-dom"
import {FilmsPage} from "./pages/FilmsPage";
import {AboutPage} from "./pages/AboutPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Routes>
                <Route path={'/'} element={<WelcomePage/>}/>
                <Route path={'/films'} element={<FilmsPage/>}/>
                <Route path={'/about'} element={<AboutPage/>}/>
                {/*<Redirect to={'/'}/>*/}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={'/'} element={<WelcomePage/>}/>
            <Route path={'/films'} element={<FilmsPage/>}/>
            <Route path={'/about'} element={<AboutPage/>}/>
            {/*<Redirect to={'/'}/>*/}
        </Routes>
    )
}