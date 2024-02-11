import React,{  useEffect} from 'react'
import { Link ,useLocation, useNavigate} from "react-router-dom";
const Navbar = (props) => {
    let location = useLocation();
    console.log("mosin")
    useEffect(() => {
     console.log(location.pathname);
     
    }, [location]);
    let navigate=useNavigate();
    const handleLogOut=()=>{
        localStorage.removeItem('token');
        navigate("/login")
        props.showAlert("Logged Out successfully","success")

    }
  
    return (
        <div style={{position:"sticky",zIndex:"1",width:"100vw",top:"0px"}}>


            <nav className="navbar navbar-expand-lg navbar-dark  bg-dark" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={ `nav-link  ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={ `nav-link  ${location.pathname==="/about"?"active":""}`}  to="/about">About</Link>
                            </li>
                         


                        </ul>
                        { !localStorage.getItem('token')?
                        <form className='d-flex'>
                            
                            <Link className='btn btn-primary mx-1' to="/login"role='submit'>Login</Link>
                            <Link className='btn btn-primary mx-1' to="/signup"  role='submit'>SignUp</Link>
                            
                        </form>:<Link className='btn btn-primary mx-1' to="/login" onClick={handleLogOut} role='submit'>LogOut</Link>}

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
