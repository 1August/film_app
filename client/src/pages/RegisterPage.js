import {useHttp} from "../hooks/http.hook"
import {useContext, useEffect, useState} from "react"
import {AuthContext} from "../context/AuthContext"
import {useNavigate} from "react-router-dom";

export const RegisterPage = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({ email: '', password: '' })

    const formChangeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const {loading, error, request} = useHttp()

    const registerHandler = async () => {
        try{
            const url = '/api/auth/register'
            const data = await request(url, 'POST', {...form})
            console.log('Data', data)

            await loginHandler()
        } catch (e){
            console.error(e)
        }
    }

    const loginHandler = async () => {
        try{
            const url = '/api/auth/login'
            const data = await request(url, 'POST', {...form})

            auth.login(data.token, data.userId)
            navigate('/')
        } catch (e){
            console.error(e)
        }
    }

    // useEffect(() => {
    //     console.log(error.message)
    // }, [error])


    return(
        <section id={'auth'}>
            <div className="container">
                <form action="">
                    <label htmlFor="email">
                        <p>Email</p>
                        <input type="email" id={'email'} onChange={formChangeHandler} placeholder={'example@mail.com'} name={'email'}/>
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input type="password" id={'password'} onChange={formChangeHandler} placeholder={'password'} name={'password'}/>
                    </label>
                    <button type={'submit'} onClick={loginHandler} disabled={loading}>Login</button>
                    <button type={'submit'} onClick={registerHandler} disabled={loading}>Register</button>
                </form>
            </div>
        </section>
    )
}