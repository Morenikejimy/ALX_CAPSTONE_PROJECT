import react from 'react';

const Login = () => { 
    return (
        <div>
        <h1> Hey! Welcome Book <span> Nerd </span> </h1>
        <p> Login to explore a world of books tailored just for you! </p>
        <input type="text" placeholder="Username or email"/>
        <input type="password" placeholder="Password"/>
        <button>Login</button>
        <a href="#">Forgot Password?</a>
        <p> Don't have an account? <a href="#"> Sign Up</a> </p>
        </div>
    )
};
export default Login;