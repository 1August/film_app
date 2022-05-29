import {WelcomePage} from "./pages/WelcomePage"
import {Routes, Route} from "react-router-dom"
import {MoviesPage} from "./pages/MoviesPage";
import {SearchPage} from "./pages/SearchPage";
import {AuthPage} from "./pages/AuthPage";
import {AccountPage} from "./pages/AccountPage";
import {MoviePage} from "./pages/MoviePage";
import {CategoryPage} from "./pages/CategoryPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Routes>
                <Route path={'/'} element={<WelcomePage/>}/>
                <Route path={'/movies'} element={<MoviesPage/>}/>
                <Route path={'/movies/:categoryURL'} element={<CategoryPage/>}/>
                <Route path={'/search'} element={<SearchPage/>}/>
                <Route path={'/account/:id'} element={<AccountPage/>}/>
                <Route path={'/movie/:id'} element={<MoviePage/>}/>

                {/*<Route path={'/login'} element={<AuthPage/>}/>*/}

                {/*<RequestAuth/>*/}
                {/*<Navigation to={'/'}/>*/}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={'/'} element={<WelcomePage/>}/>
            <Route path={'/movies'} element={<MoviesPage/>}/>
            <Route path={'/movies/:categoryURL'} element={<CategoryPage/>}/>
            <Route path={'/search'} element={<SearchPage/>}/>
            <Route path={'/auth'} element={<AuthPage/>}/>
            <Route path={'/movie/:id'} element={<MoviePage/>}/>


            {/*<Route path={'/account'} element={*/}
            {/*    <RequireAuth>*/}
            {/*        <Account/>*/}
            {/*    </RequireAuth>*/}
            {/*}/>*/}

            {/*<Navigate to={'/'}/>*/}
        </Routes>
    )
}