import {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

export default function Resource(props) {
  const [title, setTitle] = useState(props.title);
  const [html, setHTML] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
  useEffect(() => {
    setTitle(props.title);
    setConvertedText(props.content)
    setHTML(convertedText)
  }, [convertedText, props.content, props.title]);

  function saveDocument(){
    if(title !== "" && html !== ""){
      axios.put(`http://localhost:5000/content/${title}`, {
        "title":title,
        "html":html,
        "date": new Date()
      })
      props.handleSave();
    } else {
      setErrorMessage("Cannot save empty feilds")
    }
  }

  

  return (
    <div className={props.activated  ? "display" : "hide"}>
      <span className={errorMessage.length > 0 ? "error-message display" : "error-message hide"}>{errorMessage}</span>
        <div>
            <span className="warning">You can only edit this once</span> <br/>
            <label>Title:<input type="text" placeholder={title} value={title} onChange={(e) => setTitle(e.target.value)} /></label>
        </div>
      <ReactQuill
        theme='snow'
        value={html}
        onChange={setHTML}
        style={{minHeight: '300px'}}
      />
      <button type="button" onClick={()=> {
        saveDocument();
        props.refresh();
        props.togglePopup();
        }}>Save</button>
    </div>
  );
}