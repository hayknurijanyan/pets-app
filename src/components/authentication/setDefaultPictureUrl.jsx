import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import PropTypes from "prop-types";
import logger from "../../services/logService";

function SetDefaultPictureUrl(props) {
  const { onHandlePetUrlSet, pet } = props;
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    const handleChange = async () => {
      try {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`petPictures/${pet}.jpg`);
        setFileUrl(await fileRef.getDownloadURL());
      } catch (err) {
        logger.log(err);
      }
    };
    handleChange();
    onHandlePetUrlSet(fileUrl);
  });

  return null;
}

SetDefaultPictureUrl.propTypes = {
  onHandlePetUrlSet: PropTypes.func.isRequired,
  pet: PropTypes.string.isRequired,
};

export default SetDefaultPictureUrl;
