import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [credentials,setCrediantials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body:JSON.stringify({name:name,email:email,password:password})
          

        });
        const json= await response.json();
        console.log(json);
        if(json.success){
            //save authtoken  and redirect
           
      
            localStorage.setItem("token",json.authToken)
           
            navigate("/")
            props.showAlert("Signed In Succussfully","success");
        }
        else{
            console.log("invalid credintials",json.success)
            props.showAlert("Invalid Details","danger")
        }

    } 
    const onChange = (e) => {
        setCrediantials({ ...credentials, [e.target.name]: e.target.value })
      }
    return (
        <div className='container mt-5'>
            <h2>SignUp to Use iNoteBook </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} value={credentials.name} required />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} required minLength={5}/>
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
