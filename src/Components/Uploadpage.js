import { content } from '@syncfusion/ej2-react-grids'
import axios from 'axios'
import React , { useEffect, useState }from 'react'

export default function Uploadpage() {
    
  const [file, setFile] = useState(null)

  function handleChange(event) {
    setFile(event.target.files[0])
    console.log(event.target.files)
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = '/addfilepdf/ssuwwk/stype/sfile1s/sfilesubject/soldref/screatedby/owner';
    const formData = new FormData();
    formData.set('file', file);
    const config = {
      headers: {
        Accept:"application/json"
      },
    };
    axios.post(url,formData,config).then((response) => {
    console.log(response);
    });

  }
  return (
    <div>
    <h3>UPLOAD FILE</h3>
    <form onSubmit={handleSubmit}>
    <div style={{display:"flex", textAlign:"centre",justifyContent: "center"}}>
    <input type="file" name="file" onChange={handleChange}   accept="application/pdf,"/>
    <div>
    <input type="text" placeholder="docsub"/>
    </div>
    <div>
    <input type="text" placeholder="docsub"/>
    </div>
    <div>
    <input type="text" placeholder="docsub"/>
    </div>
    <div>
    <input type="text" placeholder="docsub"/>
    </div>
    <input type="submit" value="upload"/>
    </div>
    
    
    </form>
    
    
    </div>
  )
}
