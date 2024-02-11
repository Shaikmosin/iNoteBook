


import Notes from './Notes'

const Home = (props) => {


  
  return (
    <div>
      {console.log("before note")}
      <Notes showAlert={props.showAlert} />
      {console.log("after note")}
   
     
    </div>
  )
}

export default Home

