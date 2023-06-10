import { Navigate } from "react-router-dom"
import { useState } from "react"

// redirect users if not logged in
export default function inbox() {
    const [user, setUser] = useState('name')

    if (!user) {
        return <Navigate to="/" replace={true} />
    }

    <button onClick={() => setUser(null)}>Logout</button>
}