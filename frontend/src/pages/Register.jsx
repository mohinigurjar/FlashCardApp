
const Register = () => {
    return (
        <div>
        <div class = "h-screen flex items-center justify-center bg-gray-100">
        <form class = "bg-white p-8 rounded shadow-md w-full max-w-md">
        <input type="text" maxLength={15} placeholder="Enter name..."></input><br></br>
        <input type="email" placeholder="demo@example.com..."></input><br></br>
        <input type="password" minLength={8} placeholder="Enter Password..."></input>


        </form>
        </div>
        </div>
    )
}

export default Register