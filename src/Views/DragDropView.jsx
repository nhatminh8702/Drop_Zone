import React, { useState, useEffect } from "react";
import DragDropFile from "../components/DragDropFile";
import ListFiles from "../components/ListFiles";
import { fetchListFiles, uploadFile, deleteFile } from "../store/storageSlice";
import { useDispatch, useSelector } from "react-redux";
const DragDropView = () => {
  const dispatch = useDispatch();
  const { fileList } = useSelector((store) => store.storage);

  useEffect(() => {
    dispatch(fetchListFiles());
  }, []);

  const onChange = (fileList) => {
    dispatch(uploadFile(fileList));
  };

  const onDelete = (fullPath) => {
    dispatch(deleteFile(fullPath));
  };

  return (
    <div id="drag-drop-view">
      <DragDropFile onChange={onChange} maxSize={10485760} />
      <ListFiles fileList={fileList} onDelete={onDelete} />
    </div>
  );
};

export default DragDropView;
