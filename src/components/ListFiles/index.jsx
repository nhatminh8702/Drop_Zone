import React, { useEffect, useState } from "react";
import "./style.scss";

import { useSelector } from "react-redux";
import FileItem from "../FileItem";
import ArrowIconPagination from "../ArrowIconPagination";
const ListFiles = (props) => {
  const { isLoading } = useSelector((store) => store.storage);
  const { fileList, onDelete } = props;
  const itemPerPage = 3;
  const amountOfPixelToSlide = itemPerPage * 258;
  const [currentSlidePosition, setCurrentSlidePosition] = useState(0);
  
  const handleClickDelete = (item) => {
    if (!isLoading) {
      onDelete(item);
    }
  };

  const renderList = fileList.map((item, index) => (
    <div className={isLoading ? "disable" : ""} id="box-file" key={index}>
      <FileItem
        contentType={item.contentType}
        name={item.name}
        size={item.size}
        onClickDelete={() => handleClickDelete(item.fullPath)}
      />
    </div>
  ));

  return (
    <>
      <div id="list-container">
        <div id="wrap-container">
          <div
            id="box-container"
            style={{ right: currentSlidePosition * amountOfPixelToSlide + "px" }}
          >
            {renderList}
          </div>
        </div>
        <ArrowIconPagination
          numberOfItem={fileList.length}
          disabled={isLoading}
          itemPerPage={itemPerPage}
          currentSlidePosition={currentSlidePosition}
          setCurrentSlidePosition={setCurrentSlidePosition}
        />
      </div>
      {isLoading && <span>loading...</span>}
    </>
  );
};

export default ListFiles;
