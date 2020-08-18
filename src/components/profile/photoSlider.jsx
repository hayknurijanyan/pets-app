import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

class PhotoSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      open: true,
    };
  }

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
    this.setState({ open: false });
    this.props.backClickHandler();
  };
  handleNext = () => {
    if (this.state.index < this.props.images.length - 1) {
      this.setState({
        index: this.state.index + 1,
        open: true,
      });
    }
  };
  handlePrev = () => {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
        open: true,
      });
    }
  };
  render() {
    const classes = {
      img: {
        display: "flex",
        height: "1000px",
        backgroundColor: "black",
      },
    };
    return (
      <React.Fragment>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.img}
        >
          <DialogTitle id="max-width-dialog-title">Your Photos</DialogTitle>
          <DialogContent>
            <div>
              <button color="primary" onClick={this.handlePrev}>
                prev
              </button>
              <div>
                <img src={this.props.images[this.state.index].img}></img>
              </div>
              <button color="primary" onClick={this.handleNext}>
                Next
              </button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

// PhotoSlider.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default PhotoSlider;
