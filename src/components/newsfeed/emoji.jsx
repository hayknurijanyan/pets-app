import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Picker from "emoji-picker-react";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function Emoji() {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  let emojiArray = [];

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    emojiArray.push(emojiObject.emoji);
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // console.log(chosenEmoji.emoji);

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="outlined"
        color="primary"
        onClick={handleClick}
      >
        <EmojiEmotionsOutlinedIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div>
          {/* {chosenEmoji ? (
            <span>You chose: {chosenEmoji.emoji}</span>
          ) : (
            <span>No emoji Chosen</span>
          )} */}
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      </Popover>
    </div>
  );
}
