import { Snackbar } from '@mui/material'
import React from 'react'

const ErrorToast = ({vertical,horizontal, open, handleClose }) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </div>
  )
}

export default ErrorToast
