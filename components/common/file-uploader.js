import React, {createRef} from "react";
import PropTypes from 'prop-types';
import ApiConnection from "../../data/network/ApiConnection";

function FileUploader(props) {
    const inputRef = createRef();
    const onButtonClick = () => {
        inputRef.current.click();
    }

    const onSelectFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        uploadFileToServer(file);
    }

    const uploadFileToServer = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append("type", props.type);
        try {
            const res = await ApiConnection.send({
                body: formData,
                method: "POST",
                url: 'v1/uploader'
            });
            props.onUploadSuccess(res.data.uploadedFile.path);
        } catch (e) {
            props.onUploadFail(e.message);
        }
    }

    return <>
        <input type="file" name="file_input" id="file_input"
               className={'d-none'} ref={inputRef} onChange={onSelectFile}/>
        {React.cloneElement(props.children, {onClick: onButtonClick})}
    </>
}

FileUploader.propTypes = {
    onUploadSuccess: PropTypes.func.isRequired,
    onUploadFail: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    type: PropTypes.string.isRequired
}

export default FileUploader;