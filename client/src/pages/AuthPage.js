import {useHttp} from "../hooks/http.hook"
import {useContext, useEffect, useRef, useState} from "react"
import {AuthContext} from "../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

import '../UI/styles/authPage.css'
import leftPict from '../UI/img/MK-movie-left.jpg'
import rightPict from '../UI/img/MK-movie-right.jpg'

export const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({ registerUsername: '', registerEmail: '', registerPassword: '', loginEmail: '', loginPassword: '' })
    const formChangeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const loginForm = useRef({})
    const registerForm = useRef({})
    const loginImg = useRef({})
    const registerImg = useRef({})
    const left = useRef({})
    const right = useRef({})

    const registerHandler = async () => {
        try{
            const url = '/api/auth/register'
            const data = await request(url, 'POST', {username: form.registerUsername, email: form.registerEmail, password: form.registerPassword})
            await loginAfterRegister()
        } catch (e){
            console.error(e)
            setTimeout(() => clearError(), 2000)
        }
    }
    const loginAfterRegister = async () => {
        try {
            const url = '/api/auth/login'
            const data = await request(url, 'POST', {email: form.registerEmail, password: form.registerPassword})
            auth.login(data.token, data.userId)
            navigate('/')
        } catch (e) {
            console.error(e)
            setTimeout(() => clearError(), 2000)
        }
    }
    const loginHandler = async () => {
        try{
            const url = '/api/auth/login'
            console.log('log', form.loginEmail, form.loginPassword)
            console.log('reg', form.registerEmail, form.registerPassword)

            const data = await request(url, 'POST', {email: form.loginEmail, password: form.loginPassword})
            auth.login(data.token, data.userId)
            navigate('/')
        } catch (e){
            console.error(e)
            setTimeout(() => clearError(), 2000)
        }
    }
    const loginWithGoogle = async e => {
        // try {
        //     const ur l = '/api/auth/loginWithGoogle'
        //     const data = await request(url)
        //     auth.login('here', data.token, data.userId)
        //     navigate('/')
        // } catch (e) {
        //     console.error(e)
        //     setTimeout(() => clearError(), 2000)
        // }
    }

    const goSignIn = e => {
        e.preventDefault()

        registerForm.current.classList.add('hideRegisterForm')
        registerForm.current.classList.remove('showRegisterForm')
        registerImg.current.classList.add('hideRegisterImg')
        registerImg.current.classList.remove('showRegisterImg')

        loginForm.current.classList.add('showLoginForm')
        loginForm.current.classList.remove('hideLoginForm')
        loginImg.current.classList.add('showLoginImg')
        loginImg.current.classList.remove('hideLoginImg')

        left.current.style.zIndex = '3'
        right.current.style.zIndex = '1'
    }
    const goSignUp = e => {
        e.preventDefault()

        registerForm.current.classList.add('showRegisterForm')
        registerForm.current.classList.remove('hideRegisterForm')
        registerImg.current.classList.add('showRegisterImg')
        registerImg.current.classList.remove('hideRegisterImg')

        loginForm.current.classList.add('hideLoginForm')
        loginForm.current.classList.remove('showLoginForm')
        loginImg.current.classList.add('hideLoginImg')
        loginImg.current.classList.remove('showLoginImg')

        left.current.style.zIndex = '1'
        right.current.style.zIndex = '3'
    }

    return(
        <section id={'auth'}>
            <div className="leftSide" ref={left}>
                <div className="login showLoginForm" ref={loginForm}>
                    <h1>Login</h1>
                    { error ? <h3 className={'errorMsg'}>Wrong values to sign in.</h3> : '' }
                    <div className="container">
                        <form className={'loginForm'}>
                            <label htmlFor="loginEmail">
                                <p>Email</p>
                                <input type="email" id={'email'} value={form.loginEmail} onChange={formChangeHandler} placeholder={'mail@example.com'} name={'loginEmail'}/>
                            </label>
                            <label htmlFor="loginPassword">
                                <p>Password</p>
                                <input type="password" id={'loginPassword'} value={form.loginPassword} onChange={formChangeHandler} placeholder={'password'} name={'loginPassword'}/>
                            </label>
                            <div className="btns">
                                <button type={'submit'} onClick={loginHandler} disabled={loading}>Login</button>
                                <button onClick={loginWithGoogle}>Google account</button>
                            </div>
                        </form>
                        <a href={'/register'} onClick={goSignUp}>Sign up</a>
                    </div>
                </div>
                <div className="registerImg hideRegisterImg" ref={registerImg}>
                    <img src={rightPict} alt="Picture"/>
                </div>
            </div>
            <div className="rightSide" ref={right}>
                <div className="register hideRegisterForm" ref={registerForm}>
                    <h1>Register</h1>
                    { error ? <h3 className={'errorMsg'}>Wrong values to sign up.</h3> : '' }
                    <div className="container">
                        <form className={'registerForm'}>
                            <label htmlFor="registerUsername">
                                <p>Username</p>
                                <input type="text" id={'registerUsername'} value={form.registerUsername} onChange={formChangeHandler} placeholder={'David Berry'} name={'registerUsername'}/>
                            </label>
                            <label htmlFor="registerEmail">
                                <p>Email</p>
                                <input type="email" id={'registerEmail'} value={form.registerEmail} onChange={formChangeHandler} placeholder={'mail@example.com'} name={'registerEmail'}/>
                            </label>
                            <label htmlFor="registerPassword">
                                <p>Password</p>
                                <input type="password" id={'registerPassword'} value={form.registerPassword} onChange={formChangeHandler} placeholder={'password'} name={'registerPassword'}/>
                            </label>
                            <div className="btns">
                                <button type={'submit'} onClick={registerHandler} disabled={loading}>Register</button>
                            </div>
                        </form>
                        <a href={'/login'} onClick={goSignIn}>Sign in</a>
                    </div>
                </div>
                <div className="loginImg showLoginImg" ref={loginImg}>
                    <img src={leftPict} alt="Picture"/>
                </div>
            </div>
        </section>
    )
}