import React ,{useContext}from 'react' 
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
    const { notes,updateNote } = props;
    return (
       <div className="col-md-3">

      
            <div className="card my-3">
                
                <div className="card-body "> 
                    <div className="d-flex align-items-center">

                    <h5 className="card-title">{notes.title}</h5>
                    <i className="fa-regular fa-trash-can mx-2"
                    onClick={()=>{
                        console.log("deleltion priniting notes")
                        console.log(notes._id)
                        deleteNote(notes._id);
                        props.showAlert("Deleted Successfully","success")
                    }}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}}></i>
                    </div> 
                    <p className="card-text">{notes.description}</p>
              
                </div>
            </div>
        </div>

       
    )
}

export default NoteItem
