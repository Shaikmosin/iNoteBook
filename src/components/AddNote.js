import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:" "}) 
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:" "})
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (

            <div className="container">


                <h1>Add a Note</h1>
                <form>
                    <div class="mb-3">
                        <label htmlFor="title" class="form-label">title</label>
                        <input minLenght={5} required type="text" value={note.title} class="form-control" id="title" name="title" onChange={onChange} />
                     
                    </div>
                    <div class="mb-3">
                        <label htmlFor="description" class="form-label">description</label>
                        <input minLenght={5} required onChange={onChange} value={note.description} type="text" name="description" class="form-control" id="description" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="tag" class="form-label">tag</label>
                        <input onChange={onChange} type="text" value={note.tag} name="tag" class="form-control" id="tag" />
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" class="btn btn-primary"
                    onClick={handleClick }>Add Note</button>
                </form>
            </div>
        
    )
}

export default AddNote
