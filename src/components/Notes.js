import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const {showAlert}=props;
  const context = useContext(noteContext);
  const { notes, getNotes,editNote} = context;
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){

        getNotes()
    }
    else{
      navigate("/login")

    }
    // eslint-disable-next-line  

  }, [])
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" })
  const ref = useRef(null)
  const refClose=useRef(null)
  const updateNote = (currentNote) => {
    console.log("click")
    ref.current.click()
    setNote({id:currentNote._id ,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
   

  } 
  
  const handleClick = (e) => {
    console.log("updating ,,"+note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    showAlert("Updated Successfully","success")
    

  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      {console.log("before add")}
      <AddNote />
      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="d-none  btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div class="mb-3">
                  <label htmlFor="etitle" class="form-label">etitle</label>
                  <input type="text" minLenght={5} required class="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />

                </div>
                <div class="mb-3">
                  <label htmlFor="edescription" class="form-label">edescription</label>
                  <input minLenght={5} required onChange={onChange} type="text" name="edescription" class="form-control" id="edescription" value={note.edescription}/>
                </div>
                <div class="mb-3">
                  <label htmlFor="etag" class="form-label">etag</label>
                  <input onChange={onChange} type="text" name="etag" class="form-control" id="etag" value={note.etag}/>
                </div>

              </form>
            </div>
            <div class="modal-footer">
              <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick}class="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      {console.log("after add")}
      <div className="row my-3">
        {console.log("done")}
        <h2>Your Notes</h2>
        <div className="container mx-2">
            {notes.length===0 && "No notes available to display"}
            
          </div>
        {localStorage.getItem("token")&&notes.map((note) => {
          // {console.log(note.id,note)}
        
          return <NoteItem key={note._id} updateNote={updateNote} notes={note} showAlert={showAlert} />
        })}

      </div>
    </>
  )
}
export default Notes
