import {WelcomePage} from "./pages/WelcomePage"
import {Routes, Route} from "react-router-dom"
import {FilmsPage} from "./pages/FilmsPage";
import {AboutPage} from "./pages/AboutPage";
import {RegisterPage} from "./pages/RegisterPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Routes>
                <Route path={'/'} element={<WelcomePage/>}/>
                <Route path={'/films'} element={<FilmsPage/>}/>
                <Route path={'/about'} element={<AboutPage/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/account/:id'} element={<h1>Account page</h1>}/>

                {/*<Route path={'/login'} element={<RegisterPage/>}/>*/}

                {/*<RequestAuth/>*/}
                {/*<Navigation to={'/'}/>*/}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={'/'} element={<WelcomePage/>}/>
            <Route path={'/films'} element={<FilmsPage/>}/>
            <Route path={'/about'} element={<AboutPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>


            {/*<Route path={'/account'} element={*/}
            {/*    <RequireAuth>*/}
            {/*        <Account/>*/}
            {/*    </RequireAuth>*/}
            {/*}/>*/}

            {/*<Navigate to={'/'}/>*/}
        </Routes>
    )
}