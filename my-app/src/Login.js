import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [credentialsError, setCredentialsError] = useState('');
    const LoginSubmitForm = async (e) => {
        e.preventDefault();
        await fetch('https://jsonplaceholder.typicode.com/users/').then((response)=>{
            if(response.status !== 200)
            {
                throw new Error('Bad Response from Server');
            }
            return response.json();
        }).then((jsonData)=>{
            let userData = jsonData.filter((obj)=>{
                return obj.username === userName;
            })
            if(userData.length === 0){
                setCredentialsError('user does not exists');
            }
            else{
                if(userData[0].address.zipcode === password)
                {
                    navigate('/HomePage',{state:{disableButtons: true, isHomePage: true}});
                }
                else{
                    setCredentialsError('* Incorrect Password');
                }
            }
        }).catch((error)=>{
            console.log('error',error);
            setCredentialsError('Bad Response from Server');
        });

    }
    return (
        <div className='LoginPage-Body'>
            <div className="Login-Box">
                    <h1 className="Login-Box-Title">Login</h1>
                    <form onSubmit={LoginSubmitForm}>
                        <input type='text' 
                            name='userName'
                            placeholder="UserName"
                            value={userName} 
                            required
                            onChange={(e)=>{setUserName(e.target.value)}}
                        />
                        <input type='password' 
                            name='Password'
                            placeholder="Password"
                            value={password} 
                            required
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <span style={{color: '#ca2282'}}>{credentialsError}</span>
                        <input type='submit'
                            name='Submit'
                            value='Login'
                        />
                    </form>
            </div>
        </div>
    )
}

export default Login;