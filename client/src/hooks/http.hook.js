import {useCallback, useState} from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)

        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }

        try{
            const res = await fetch(url, {method, headers, body})
            const data = await res.json()

            if(!res.ok) throw new Error(data.message || 'Something wrong')
            setLoading(false)
            return data
        } catch (e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = () => { setError(null) }
    return { loading, request, error, clearError }
}