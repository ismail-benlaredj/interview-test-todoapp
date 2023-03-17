import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import useFetchData from "@hooks/useFetchData"
import { AUTH_API } from "@const/index"
import MainLayout from "@layouts/MainLayout"
import { useStoreState, useStoreActions } from '../lib/store';


export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [url, setUrl] = useState<string>('');
    const [data, isLoading, error] = useFetchData(url);
    const navigate = useNavigate();
    const { setUser } = useStoreActions((actions) => actions.user)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUrl(AUTH_API + email)
    }

    useEffect(() => {
        if (data && data.length > 0) {
            localStorage.setItem('user', JSON.stringify(data));
            console.log(data[0].id)
            setUser({
                id: data[0].id,
                email: data[0].email,
                auth: true
            })
            navigate("/");
        }
    }, [data])


    return (

        <MainLayout >
            <div className="items-center flex flex-col justify-center text-white">
                <h1 className="text-4xl font-bold mb-10">Log in</h1>
                <form className="w-72 text-center" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {error && <p className="text-red-700 mb-2">{error.message}</p>}
                        {data && data.length === 0 && <p className="text-red-700 mb-2">User doesn't exist</p>}
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            id="email" type="email" className="w-full px-4 py-2 border text-gray-800 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Enter your email address" />
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit" className="bg-blue-500 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Log in
                    </button>
                </form>
            </div>
        </MainLayout>
    )
}
