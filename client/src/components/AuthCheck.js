// import {useContext, useEffect} from "react";
// import {AuthContext} from "../../context/AuthContext";
// import {Link} from "react-router-dom";
//
// export const AuthCheck = () => {
//     const auth = useContext(AuthContext)
//
//     const logoutHandler = () => {
//         auth.logout()
//     }
//
//     useEffect(() => {
//         if (!auth.isAuthenticated){
//             return(
//                 <ul>
//                     <li><Link to={`/account/${auth.userId}`}>Account</Link></li>
//                     <li><Link to={'/'} onClick={logoutHandler}>Logout</Link></li>
//                 </ul>
//             )
//         }
//
//         return(
//             <ul>
//                 <li><Link to={'/register'}>Register</Link></li>
//             </ul>
//         )
//     }, [auth.isAuthenticated])
//
//
//
//     return(
//         <ul>
//             <li><Link to={'/register'}>Register</Link></li>
//         </ul>
//     )
// }