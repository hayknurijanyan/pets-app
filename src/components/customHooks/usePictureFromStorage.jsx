import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import PropTypes from "prop-types";
import logger from "../../services/logService";

function usePictureFromStorage(folderName, picName) {
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    let unmounted = false;
    const getPic = async () => {
      try {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`${folderName}/${picName}.jpg`);
        if (!unmounted) {
          setFileUrl(await fileRef.getDownloadURL());
        }
      } catch (error) {
        logger.log(error);
      }
    };
    getPic();
    return () => {
      unmounted = true;
    };
  }, []);
  return fileUrl;
}

usePictureFromStorage.propTypes = {
  folderName: PropTypes.string.isRequired,
  picName: PropTypes.string.isRequired,
};

export default usePictureFromStorage;
