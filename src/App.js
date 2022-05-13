import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";



function App() {
  const [notes, setNotes] = useState([]);
  const [isRealod,setIsReaload]=useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [isRealod]);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header

  */

const handleSearch=(event)=>{
  event.preventDefault();
  const query = event.target.searchText.value;
  if(query){
    fetch(`http://localhost:5000/notes?name=${query}`)
      .then((res) => res.json())
      .then((data) => setNotes(data));
    console.log(query);
    
  }
  
}
  

  
/*2. here there will be a function named handleDelete
to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
 */
const handleDelete=id=>{
 console.log(id);
 fetch(`http://localhost:5000/note/${id}`,{
   method:"DELETE",
 })
 .then(res=>res.json())
 .then(data=>console.log(data));
 setIsReaload(!isRealod);
  
 

}











  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */



   



  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */
const handlePost=event=>{
  event.preventDefault();
  const name=event.target.name.value;
  const text =event.target.text.value;
  console.log({name,text});
  fetch("http://localhost:5000/note", {
    method:"POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body:JSON.stringify({name,text})
  })
  .then(res=>res.json())
  .then(data =>setIsReaload(data));
  

}

  

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard note={note} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
