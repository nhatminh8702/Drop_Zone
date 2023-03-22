import React, { useState } from "react";
import "./style.scss";
import uploadIcon from "../../assets/icons/upload 1.svg";
import classNames from "classnames";

const DragDropFile = (props) => {
  const inputRef = React.useRef(null);
  const { onChange, maxSize } = props;
  const [error, setError] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    console.log("drag over");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    console.log("e.dataTransfer.files[0]", e.dataTransfer.files[0]);
    // console.log(e.target.files);
  };
  const handleChange = (e) => {
    if (e.target.files) {
      let upload = true;
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].size > maxSize) {
          upload = false;
          setError(true);
          break;
        }
      }
      if (upload) {
        for (let i = 0; i < e.target.files.length; i++) {
          onChange(e.target.files);
        }
        setError(false);
      }
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const { fileList, setFileList } = props;
  return (
    <div>
      <div
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        className={classNames("container", { error: error })}
      >
        <form>
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={true}
            onChange={handleChange}
          />
          <img src={uploadIcon} alt="" />
          <h3>Drag and drop files</h3>
          <p id="link" onClick={handleClick}>
            Browse file
          </p>  
        </form>
      </div>
      {error && <p className="errorMessage">The maximum file size is 10 MB</p>}
    </div>
  );
};

export default DragDropFile;
