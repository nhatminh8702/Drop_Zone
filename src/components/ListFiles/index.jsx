import React, { useEffect, useState } from "react";
import "./style.scss";
import arrowsIconLeft from "../../assets/icons/circle-arrow-left-solid.svg";
import arrowsIconRight from "../../assets/icons/circle-arrow-right-solid.svg";
import { useSelector } from "react-redux";
import FileItem from "../FileItem";
const ListFiles = (props) => {
  const { isLoading } = useSelector((store) => store.storage);
  const { fileList, onDelete } = props;
  const [itemSlidePosition, setItemSlidePosition] = useState(0);

  const handleClickArrowRight = () => {
    if (!isLoading) {
      if (itemSlidePosition * 3 + 3 < fileList.length) {
        setItemSlidePosition((c) => c + 1);
      }
    }
  };

  const handleClickArrowLeft = () => {
    if (!isLoading) {
      if (itemSlidePosition >= 1) {
        setItemSlidePosition((c) => c - 1);
      }
    }
  };

  const handleClickDelete = (item) => {
    if (!isLoading) {
      onDelete(item);
      //setItemSlidePosition(0);
    }
  };

  const renderArrowIcon = () => {
    if (fileList.length > 3) {
      if (itemSlidePosition === 0) {
        return (
          <img
            id="arrow-icon-right"
            onClick={handleClickArrowRight}
            src={arrowsIconRight}
            alt=""
          />
        );
      } else if (itemSlidePosition * 3 >= fileList.length - 3) {
        return (
          <img
            id="arrow-icon-left"
            onClick={handleClickArrowLeft}
            src={arrowsIconLeft}
            alt=""
          />
        );
      } else {
        return (
          <>
            <img
              id="arrow-icon-left"
              onClick={handleClickArrowLeft}
              src={arrowsIconLeft}
              alt=""
            />
            <img
              id="arrow-icon-right"
              onClick={handleClickArrowRight}
              src={arrowsIconRight}
              alt=""
            />
          </>
        );
      }
    }
  };

  const renderList = fileList.map((item, index) => (
    <div className={isLoading ? "disable" : ""} id="box-file" key={index}>
      <FileItem
        contentType={item.contentType}
        name={item.name}
        size={item.size}
        fullPath={item.fullPath}
        onClickDelete={handleClickDelete}
      />
    </div>
  ));

  return (
    <>
      <div id="list-container">
        <div id="wrap-container">
          <div
            id="box-container"
            style={{ right: itemSlidePosition * 258 * 3 + "px" }}
          >
            {renderList}
          </div>
        </div>
        <div id="icon">{renderArrowIcon()}</div>
      </div>
      {isLoading && <span>loading...</span>}
    </>
  );
};

export default ListFiles;
