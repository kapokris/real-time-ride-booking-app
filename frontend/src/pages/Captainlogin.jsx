import React,{ useState } from "react";
import { Link } from "react-router-dom";

const Captainlogin = () => {
  
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [captainData,setCaptainData] = useState({})
    const sumbmitHandler = (e)=>{
        e.preventDefault()
        setCaptainData({
            email:email,
            password:password
        })

        console.log(userData)
        setEmail("")
        setPassword('')
    }
    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAYFBMVEX///8AAAC5ubne3t4hISHp6enNzc35+fnz8/Opqanh4eFiYmJycnIrKytPT086OjqLi4uampoLCwvBwcGEhITW1taSkpIxMTFERERYWFhoaGh7e3uxsbFKSkoUFBSgoKCQAZu8AAAE+UlEQVR4nO2b2baqMAxAGWUQRRkEBPH///KiKdLSgAwGzlq3++30IGyhpGlaNU2hUCgUCoVCoVCsxGnY20HArG5lcL8HZXKt0r1lXtjxURfJn+a+9yxNMh3h6O2ndXhgRsDN3kXJLYeVGkJvBydvVOnFY+tO74zfJqA2NnXy0f4tU27Y4c1wmtOWVv5UpYZiIys7nyGll5s4OZOfHZBsIZXMc9L1mN6pmuukWya1kzvbqens1FJTgqYEcRBNoyVSD5dUqp88TYR0cJ4TNnksSqnLQinKsDAvlvMEdFKHpU76iS4RRYN5GRsiaJJM9/xO2OWkeI12PLJx2UafjJT0oveT7P3Du9Q0KZ0qfj7XSB2IpPAoNVGqIpJ6FkeZQurouNSTSOpdWpGQjsKlrlRS08Clbv+TlIsyUYro8TnJ4ywTTnz7qDp6gF5t55CwKk5RBU+8+rPzMJOukKJLiFGpnVMX7Y5dLqg8EbTWQJfkGeitmgJhOmyjqecUCCcOyybtLygrL/j79x3Syai2cOJHW1NfNvMjLnDgUeEb1PV0fJo1DnnRbGBKMwZ9eXFBWNigEKu51jynbQrp9qxC+jZOmmbOcHpstjjzFxeMNM2fODIHm64lO1MWQzZehGzwvlbUQ6q5wghfFrazPRa2G9LhUn+00xaAF+YFfQ+LJ3Fa8AX7UJ6E3lXn13RfJcCOvUtSBu8NOIe/INTxx7YqKRQKhUKhWIttvpDyRKwZ2jh8PE9xTR/HEQ4SSU27+3doNdTSyklYv5ovfNPl3dZRW1kRVLKX8bBOKBn3HeOzJZ4ssvLjpZ1qQL4orTFBMy81VC+794oq9uB2y0A6v8QJdh1HuFQ0WUq3fFFqcPrMT7mGjtED9ydSvXrBoJSwu3LwZO8S21yp/MPj85yEChQiVb8QF9fgH1b2Iazbow/zpfiObbMVQOF9YFJfSmXwQcGznUYG86WEKOHCzToulRJn0Q6U43J7nRRbRgt/I8XWvyxz1ePTtBt8tx9Jxe/GKF0pBd9NKCGukGKXWCnlnOX+uvpOLZASYhIU1TOhn62Qgpf5NL9PcUug1zN2aiZVes/uyKfXHyLRT8LbV7jrI7rVG8zRiC7tlWdSTrcTxK/YB28/GGbOveV2VEqqfrIvFHYh/VPbdX8y9l2+j33904+MfZ62RIrLllgLFhIE5C1BQ0p11V19ulR9Tf1PumgU0MgnJa1UUcUf5EwQV4qSlPuvlHlaQ1K9jTQwiN5lqbs2SqvxKAD4q+16NX6n6iGpXjYPrSHXOidOnYy2O8KKa8b+YlGl9xn2qwHeFZeCldKae35zpLrzm8LNgSia9a7F9mrwZx6T0hdKccETlgpOkFpXWKdy2DPmOygu5Uv2C6XY2iZMLtj+h1rI/q/QKKQkuBSMftH6O9VeE+ZGbFE/6oYns111EU6MZQkue8z5wo7OS7FfLp0d7mLNn7fY922zKtuYKA5Y7Ljk9iEp2VMW3hMmVQQy3NOQpdqOZPD3TaIWn9TY5g1hNjE478u4oxAph00c4FbgGwCt3nLdiBSW5CHwLxMi1eZ4bEyKC+kEkbT6OyiVi/aDUhZ/5zEpNjxELO1w+z9MKOVdFy6+FJrH/YqN/A0B4Td1qBSLBN2Mza6SOxDc8DfH7f/CwjDiFFslko97I7y3h3eT3/tkCkfyTUN7uRUKhUKhUCgUCsV2/ANq6kthqmAz2gAAAABJRU5ErkJggg=="
          alt=""
        />

        <form onSubmit={(e)=>{
            sumbmitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)

            }}
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] border-none mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          />
          <h3 className="text-lg font-medium mb-2"> Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)

            }}
            required
            placeholder="password"
            className="bg-[#eeeeee] border-none mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          />
          <button className="bg-[#111] text-white mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
            Login
          </button>
         
          
        </form>
        <p className="text-center"> Join a fleet? <Link to="/captain-signup" className="text-blue-600">Register as a Captain</Link> </p>
      </div>
      <div>
        <Link to="/login" className="flex items-center justify-center bg-[#d5622d] text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base ">Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin
