import React from "react";
import wordFileIcon from "../../assets/icons/word.svg";
import pdfFileIcon from "../../assets/icons/pdf.svg";
import excelFileIcon from "../../assets/icons/excel.svg";
import defaultFileIcon from "../../assets/icons/defaultFile.svg";
import deleteFileIcon from "../../assets/icons/close-circle.svg";
import { bytesFormat } from "../../utility/bytesFormat";
import "./style.scss"
const FileItem = (props) => {
  const { contentType, name, size, fullPath, onClickDelete } = props;

  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return <img id="file-icon" src={pdfFileIcon} alt="" />;
      case "application/docx":
        return <img id="file-icon" src={wordFileIcon} alt="" />;
      case "application/excel":
        return <img id="file-icon" src={excelFileIcon} alt="" />;
      default:
        return <img id="file-icon" src={defaultFileIcon} alt="" />;
    }
  };

  return (
    <>
      {renderFileIcon(contentType)}
      <div id="file-content">
        <span id="file-title">{name}</span>
        <span id="file-size ">{bytesFormat(size)}</span>
      </div>
      <img
        id="file-del-icon"
        onClick={() => onClickDelete(fullPath)}
        src={deleteFileIcon}
        alt=""
      />
    </>
  );
};

export default FileItem;
