import {useState} from 'react'
import axios from axios 
import {Link} from 'react-router-dom'

function Login(){
 const [username, setUsername] = useState()
 const [email, setEmail] = useState()
 const [password, setPassword] = useState()

    function handleSubmit(e){
        e.preventDefault()
    }
    return(
        <div className = "login">
            <h1>Log In</h1>
            <form onSubmit={()=> handleSubmit}>
                <input type= "text"
                placeholder = "Username"
                value = {username}
                onChange ={(e)=> setUsername(e.target.value)}
                required/>
                <input type= "text"
                placeholder = "Email"
                value = {email}
                onChange ={(e)=> setEmail(e.target.value)}
                required/>
                <input type= "text"
                placeholder = "Password"
                value = {password}
                onChange ={(e)=> setPassword(e.target.value)}
                required/>
            <button placeholder="submit" type ="submit">
                Log In
            </button>
            <div>
                or <Link to ='/signup'>Sign Up</Link>
            </div>
            </form>

        </div>
    )
}
export default Login 