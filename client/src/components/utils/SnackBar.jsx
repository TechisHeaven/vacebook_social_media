import { Alert, Button, Snackbar } from "@mui/material";
import React, { useContext } from "react";

const SnackBar = ({type, message}) => {
 const { Snackstate , setSnackState, SnackType, SnackMessage} = useContext(PostContext);
  let { vertical, horizontal, open } = Snackstate;

  const handleClick = (newState) => () => {
    setSnackState({ open: true, ...newState });
  };

  const handleClose = () => {
    setSnackState({ ...Snackstate, open: false });
  };
  vertical = 'top';
  horizontal = 'right';
  
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={SnackType||"success"} sx={{ width: "100%" }}>
          {SnackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
