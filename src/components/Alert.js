import React from 'react'

function Alerts(props) {
    const capitalize=(word)=>{
        if(word==="danger"){
            word="error"
        }
        let letter=word.toLowerCase();
        return letter.charAt(0).toUpperCase()+letter.slice(1)
    }
    return (
        
        props.alert && <div style={{position:"sticky",zIndex:"1",width:"100vw",top:"50px"}}>
            <div class={ `alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>:{props.alert.msg}
                
            </div>
        </div>
    )
}

export default Alerts
