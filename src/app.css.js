export default {
  // Keep the field image to the left side of the screen
  field : {
    cssFloat: 'left'
  },

  // Keep the right panel towards the right side of the screen
  panel : {
    overflow: 'hidden',
    width: '500px',
    cssFloat: 'right',
    height: '100%'
  },

  panel_upper : {
    height: '289px',
    width:'489px',
    borderWidth: '1px',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderColor: 'lightgray',
    padding: '5px',
    overflowY: 'scroll'
  },

  panel_lower_left : {
    width: '249px',
    overflow: 'hidden',
    cssFloat: 'left',
    height: '100%',
    borderWidth: '1px',
    borderLeftStyle: 'solid',
    borderColor: 'lightgray'
  },

  panel_lower_right : {
    width: '240px',
    overflow: 'hidden',
    cssFloat: 'right',
    height: '100%',
    padding: '5px'
  },

  list : {
    boxSizing: 'border-box',
    overflow: 'auto'
  },

  buttonStyle : {
    padding: '0px',
    margin: '0px',
    width: '50%',
    height: '100%',
    background: 'white',
    borderWidth: '0px',
    borderStyle: 'none',
    fontFamily: 'Roboto',
    fontWeight: '100'
  }
}
