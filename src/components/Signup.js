import {useState} from 'react'
import axios from axios 
import {Link} from 'react-router-dom'

function Signup(){
 const [username, setUsername] = useState()
 const [email, setEmail] = useState()
 const [firstName, setFirstName] = useState()
 const [lastName, setLastName] = useState()
 const [password, setPassword] = useState()

    function handleSubmit(e){
        e.preventDefault()
            const user ={
                username: username,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
            axios.post('http://localhost:3001/users',{user},{withCredentials:true})
                .then (res =>{
                    if(res.data.status === 'created'){
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

    }
    return(
        <div className = "Signup">
            <h1>Sign up</h1>
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
                placeholder = "FirstName"
                value = {firstName}
                onChange ={(e)=> setFirstName(e.target.value)}
                required/>
                <input type= "text"
                placeholder = "LastName"
                value = {lastName}
                onChange ={(e)=> setLastName(e.target.value)}
                required/>
                <input type= "text"
                placeholder = "Password"
                value = {password}
                onChange ={(e)=> setPassword(e.target.value)}
                required/>
            <button placeholder="submit" type ="submit">
                Sign Up
            </button>
            <div>
                or <Link to ='/login'>Login</Link>
            </div>
            </form>

        </div>
    )
}
export default Signup 