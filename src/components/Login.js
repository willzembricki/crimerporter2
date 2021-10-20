import {useState} from 'react'
import axios from axios 
import {Link} from 'react-router-dom'

function Login({handleLogin}){
 const [username, setUsername] = useState()
 const [email, setEmail] = useState()
 const [password, setPassword] = useState()
 const [errorMsg, setErrorMsg] = useState()

    function handleSubmit(e){
        e.preventDefault()
        const user ={
            username: username,
            email: email,
            password: password
        }
        axios.post('http://localhost:3001/login',{user},{withCredentials:true})
            .then (res =>{
                if(res.data.logged_in){
                    handleLogin(res.data)
                    redirect()   
                }
                else{
                    setErrorMsg(res.data.errors)
                }
            })
            .catch(error => console.log('api errors:', error))
    }
        function redirect(){
            history.push('/')
        }
        // error handling function 
        // handleErrors = () => {
        //     return (
        //       <div>
        //         <ul>
        //         {this.state.errors.map(error => {
        //         return <li key={error}>{error}</li>
        //           })}
        //         </ul>
        //       </div>
        //     )
        //   };    

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