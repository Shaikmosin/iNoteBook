const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator')
//ROUTE 1-Get all the Notes using:GET "/api/notes/fetchallnotes".Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })

        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal Server Error")
    }
})
//ROUTE 2-Add a new Note using:POST "/api/auth/addnote".Login required
router.post('/addnote', fetchuser, [body('title', "enter a valid title").isLength(), body('description', "Description must be atleast 5 characters").isLength({ min: 5 })], async (req, res) => {
    try {


        // if there are errors, return bad request and errors
        const { title, description, tag } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // handle validation errors
            return res.status(400).json({ errors: errors.array(), message: errors.isEmpty() })

        }
        const note = new Notes({
            description,title, tag, user: req.user.id

        })
        const savedNote = await note.save()
        // const savedNote= await Notes.create({
        //     title: title,
        //     description:description ,
        //    tag:tag

        // })
        res.json(savedNote)


        
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal Server Error")
    }

})
//ROUTE 3-Update an existing Note using:put "/api/notes/updatenote".Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title,description,tag}=req.body;
    // create a newNote object
    const newNote={};
    if(title) {newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    // find the note to be updated
    let note=await Notes.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
         
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})



})

//ROUTE 4-Deleting an existing Note using:DELETE"/api/notes/updatenote".Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try{
    // find the note to be updated
    // console.log(req.params)
    let note=await Notes.findById(req.params.id);
    // console.log(note)
    if(!note){ return res.status(404).send("Not Found")}
    //allow deletion only id user owns this note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
         
    }
    // console.log(req.params)

    note=await Notes.findOneAndDelete(note._id)
   
    res.json({"success":"Note has been deleted",note})
}catch (error) {
    console.error(error.message)
    return res.status(500).send("Internal Server Error")
}



})
module.exports = router