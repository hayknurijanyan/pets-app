// import React, { useState, useEffect } from "react";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { makeStyles } from "@material-ui/core/styles";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import { IconButton } from "@material-ui/core";
// import useCurrentUserData from "../customHooks/useCurrentUserData";
// import { db } from "../../firebase";
// import { ImageAvatarSmall } from "./avatar";
// import Loader from "../loader";
// import firebase from "firebase";

// function PhotoSlider(props) {
//   const [index, setIndex] = useState(props.index);
//   const [open, setOpen] = useState(true);
//   const [userImages, setUserImages] = useState(null);
//   const [likesOpen, setLikesOpen] = useState(false);
//   const [userData, setUserData] = useState({ ...useCurrentUserData() });
//   let likes = null;

//   console.log(userData, "eeeeeeeeeeeeeeeeee");
//   setUserImages({ ...userData });
//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     const user = firebase.auth();
//   //     if (user) {
//   //       const ref = db.collection("users").doc(user);
//   //       const collection = await ref.get();

//   //       setUserData({ ...collection.data() });
//   //     } else {
//   //       console.log("user data not found");
//   //     }
//   //   };
//   //   fetchUserData();
//   // }, []);

//   if (userData) {
//     const image = userData.photos[index];
//     console.log(image, "image");
//     likes = (
//       <div style={{ width: "500px", height: "500px" }}>
//         {Array.from(image.likes).map(async (uid) => {
//           const userRef = db.collection("users").doc(uid);
//           const user = await userRef.get();
//           const data = user.data();
//           if (data) {
//             return (
//               <div>
//                 asd
//                 <ImageAvatarSmall
//                   imageUrl={
//                     data.avatar !== ""
//                       ? data.avatar
//                       : "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg"
//                   }
//                 />
//                 <FavoriteBorderIcon
//                   color="primary"
//                   style={{ width: "80", height: "80" }}
//                 >
//                   Back
//                 </FavoriteBorderIcon>
//                 <hr />
//               </div>
//             );
//           }
//         })}
//       </div>
//     );
//   } else {
//     likes = (
//       <div>
//         <Loader />
//         <FavoriteBorderIcon
//           color="primary"
//           style={{ width: "80", height: "80" }}
//         >
//           Back
//         </FavoriteBorderIcon>
//       </div>
//     );
//   }

//   function handleClose() {
//     setOpen({ open: false });
//     props.backClickHandler();
//   }
//   function handleLikesClose() {
//     setLikesOpen(!likesOpen);
//   }
//   function handleNext() {
//     if (index < props.images.length - 1) {
//       setIndex(index + 1);
//     }
//   }
//   function handlePrev() {
//     if (index > 0) {
//       setIndex(index - 1);
//     }
//   }
//   const useStyles = makeStyles((theme) => ({
//     img: {
//       width: "80%",
//       height: "auto",
//       objectFit: "contain",
//       overflow: "hidden",
//     },
//     btn: {
//       // position: "absolute",
//       width: "20%",
//     },
//     btnNext: {
//       right: "0px",
//       // position: "absolute",
//       width: "20%",
//     },
//     divStyle: {
//       width: "100%",
//       maxWidth: "100vw",
//       maxHeight: "100%",
//       position: "absolute",
//       top: "50%",
//       left: "0",
//       display: "flex",
//       flexDirection: "column",
//       alignContent: "center",
//       overflowY: "hidden",
//     },
//     nestedDiv: {
//       width: "70%",
//       height: "auto",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     imgDiv: {
//       width: "100%",
//       height: "70%",
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     content: {
//       width: "100%",
//       height: "100%",
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     likes: {
//       width: "200px",
//       height: "200px",
//     },
//   }));
//   const classes = useStyles();
//   return (
//     <>
//       <Dialog
//         open={likesOpen}
//         onClose={handleLikesClose}
//         className={classes.likes}
//       >
//         <div className={classes.content}>{likes}</div>
//         <Button onClick={handleLikesClose}></Button>
//       </Dialog>
//       <Dialog open={true} onClose={handleClose} className={classes.content}>
//         {/* <DialogContent className={classes.content} name="content"> */}
//         <div className={classes.nestedDiv}>
//           <div name="imgdiv" className={classes.imgDiv}>
//             <Button
//               color="primary"
//               onClick={handlePrev}
//               className={classes.btn}
//             >
//               prev
//             </Button>
//             <img src={props.images[index].img} className={classes.img}></img>
//             <Button
//               color="primary"
//               onClick={handleNext}
//               className={classes.btnNext}
//             >
//               Next
//             </Button>
//           </div>
//           <IconButton>
//             <FavoriteBorderIcon color="primary" onClick={handleLikesClose} />
//           </IconButton>
//           <div>{props.images[index].likes.length}</div>
//         </div>
//         {/* </DialogContent> */}
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//           <Button
//             onClick={() => props.onDelete(props.images[index].img)}
//             color="secondary"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default PhotoSlider;
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  Typography,
  IconButton,
  CardContent,
  TextField,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SliderComment from "./sliderComment";
import { ImageAvatarSmall } from "./avatar";
import { db } from "../../firebase";
import LikeRow from "./likeRow";
import { auth } from "firebase";
function PhotoSlider(props) {
  const [index, setIndex] = useState(props.index);
  const [open, setOpen] = useState(true);
  const [likesComponent, setLikesComponent] = useState(false);
  const [likes, setLikes] = useState(null);
  function likesComponentOpen() {
    setLikesComponent(!likesComponent);
  }
  function handleClose() {
    setOpen({ open: false });
    props.backClickHandler();
  }
  function setLike() {
    const fetch = async function () {
      const userRef = db.collection("users").doc(auth().currentUser.uid);
      const data = await userRef.get();
      console.log(data.data().photos[index].likes);
      setLikes(data.data().photos);
    };
    fetch().then(() => {
      if (likes !== null) {
        console.log(likes, "ffffffffff");

        const newLikeUrl = [...likes[index].likes].push(auth().currentUser.uid);
        db.collection("users")
          .doc(auth().currentUser.uid)
          .update({
            photos: {
              url: likes[index].url,
              comments: [...likes[index].comments],
              likes: [...newLikeUrl],
            },
          });
      }
    });
  }
  function handleNext() {
    if (index < props.images.length - 1) {
      setIndex(index + 1);
    }
  }
  function handlePrev() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  const useStyles = makeStyles((theme) => ({
    img: {
      maxWidth: "100%",
      maxHeight: "70%",
      objectFit: "contain",
    },
    imgDiv: {
      maxWidth: "70%",
      maxHeight: "70%",
    },
    divStyle: {
      width: "100%",
    },
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    btn: {
      color: "secondary",
      height: "100%",
    },
    media: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 80,
      marginTop: 0,
    },
    icons: {},
    comments: {
      display: "flex",
      marginLeft: 300,
      flexDirection: "row",
      alignItems: "center",
      marginTop: -48,
    },
    commentInput: {
      display: "flex",
      flexDirection: "row",
      margin: 15,
      alignItems: "center",
    },
    addButton: {
      width: 70,
      height: 54,
      marginBottom: 3,
    },
    commentArea: {
      display: "flex",
      flexDirection: "column",
    },
    likesComponent: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    likesComponentDiv: {
      width: "500px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    likesContent: {
      marginTop: "15px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    likesHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: "20px",
      paddingLeft: "20px",
    },
  }));
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  // ​   const handleExpandClick = () => {
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Dialog
        open={likesComponent}
        onClose={likesComponentOpen}
        className={classes.likesComponent}
      >
        <div className={classes.likesComponentDiv}>
          <div className={classes.likesHeader}>
            <span>
              <FavoriteIcon color="secondary" />
            </span>
            <span>
              {`${props.images[index].likes.length}
                 likes`}
            </span>
          </div>
          {props.images[index].likes.map((url) => (
            <LikeRow url={url} />
          ))}
          <Button color="primary" onClick={likesComponentOpen}>
            Close
          </Button>
        </div>
      </Dialog>
      <Dialog className={classes.divStyle} open={true} onClose={handleClose}>
        <DialogTitle id="max-width-dialog-title">Your Photos</DialogTitle>​
        <DialogContent className={classes.content}>
          <Button color="primary" onClick={handlePrev} className={classes.btn}>
            prev
          </Button>
          <div className={classes.imgDiv}>
            <img src={props.images[index].img} className={classes.img}></img>
          </div>
          <Button color="primary" onClick={handleNext}>
            Next
          </Button>
        </DialogContent>
        ​
        <DialogContent className={classes.icons}>
          <div className={classes.media}>
            <IconButton
              aria-label="add to favorites"
              name="likes"
              onClick={setLike}
            >
              <FavoriteIcon color="secondary" />
            </IconButton>
            <IconButton onClick={likesComponentOpen}>
              {props.images[index].likes.length}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </div>
          <div className={classes.comments}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Typography>
              Comments {props.images[index].comments.length}
            </Typography>
          </div>
          <div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <div className={classes.commentArea}>
                  <div className={classes.commentInput}>
                    <TextField
                      id="outlined-full-width"
                      style={{ margin: 6 }}
                      placeholder="Write a comment"
                      margin="normal"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                    <Button
                      className={classes.addButton}
                      variant="contained"
                      color="primary"
                    >
                      Add
                    </Button>
                  </div>
                  <SliderComment />
                </div>
              </CardContent>
            </Collapse>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={() => props.onDelete(props.images[index].img)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default PhotoSlider;
