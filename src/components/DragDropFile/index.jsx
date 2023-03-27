import React, { useState } from "react";
import "./style.scss";
import uploadIcon from "../../assets/icons/upload 1.svg";
import classNames from "classnames";

const DragDropFile = (props) => {
  const inputRef = React.useRef(null);
  const { onChange, maxSize, maxSizeErrorMessage } = props;
  const [error, setError] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onChange(e.dataTransfer.files);
    setError(false);
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
        onChange(e.target.files);
        setError(false);
      }
    }
  };
  const checkSize = (files) => {};

  const handleClick = () => {
    inputRef.current.click();
  };

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
      {error && <p className="errorMessage">{maxSizeErrorMessage}</p>}
    </div>
  );
};

export default DragDropFile;
