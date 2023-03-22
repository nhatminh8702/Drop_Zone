import React, { useState } from "react";
import DragDropFile from "../components/DragDropFile";
import ListFiles from "../components/ListFiles";
import { uploadBytes } from "firebase/storage";
import storage from "../storage/FireBaseStorage";
import { ref, listAll, getMetadata } from "firebase/storage";
const DragDropView = () => {
  const [fileList, setFileList] = useState([]);
  const storageRef = ref(storage, "storage/");

  listAll(storageRef).then((res) => {
    res.items.forEach((itemRef) => {
      getMetadata(itemRef).then((res) => console.log(res) );
    });
  });
  const onChange = (fileList) => {
    for (let i = 0; i < fileList.length; i++) {
      uploadBytes(ref(storage, "storage/" + fileList[i].name), fileList[i]);
    }
  };

  return (
    <div>
      <DragDropFile onChange={onChange} maxSize={1048576} />
      <ListFiles />
    </div>
  );
};

export default DragDropView;
