import React, { useState } from "react";
import "./style.scss";
import uploadIcon from "../../assets/icons/upload 1.svg";
import classNames from "classnames";
import { bytesFormat } from "../../utility/bytesFormat";
const DragDropFile = (props) => {
  const inputRef = React.useRef(null);
  const { onChange, maxSize } = props;
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
    const fileList = Array.from(e.target.files);
    console.log(fileList);
    if (e.target.files) {
      const isErrorMaxSize = fileList.some((file) => file.size > maxSize);
      if (!isErrorMaxSize) {
        onChange(e.target.files);
      }
      setError(isErrorMaxSize);
    }
  };

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
      {error && (
        <p className="errorMessage">
          The maximum file size is {bytesFormat(maxSize)}
        </p>
      )}
    </div>
  );
};

export default DragDropFile;
