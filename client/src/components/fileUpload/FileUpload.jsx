import { useState } from "react";
// import axios from "axios";
import * as actionAuth from '../../redux/Auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

function FileUpload( ) {
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const userContent = useSelector((state) => state.auth.userContent);
    const userId = userContent.userID

    const handleFile = (e) =>{
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        const formdata = new FormData();
        formdata.append('profilePic', file);
        formdata.append('userID', userId);
       dispatch(actionAuth.uploadPic(formdata));
    }
    return (
        <div className="file-container">
            <input type="file" onChange={handleFile}/>
            <button onClick={handleUpload}>upload</button>

        </div>
    )
}

export default FileUpload;