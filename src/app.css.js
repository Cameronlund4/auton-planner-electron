// CSS object for use within app.jsx
export default {
  // Keep the field image to the left side of the screen
  field : {
    cssFloat: 'left'
  },

  // Keep the panel to the right side of the screen and fit height
  panel : {
    overflow: 'hidden',
    width: '500px',
    cssFloat: 'right',
    height: '100%'
  },

  // Upper section of the panel, contains action jsx
  panel_upper : {
    width:'489px',
    borderWidth: '1px',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderColor: 'lightgray',
    padding: '5px',
    overflowY: 'scroll'
  },

  // Lower left section of panel, contains action list
  panel_lower_left : {
    width: '249px',
    overflow: 'hidden',
    cssFloat: 'left',
    height: '300px',
    borderWidth: '1px',
    borderLeftStyle: 'solid',
    borderColor: 'lightgray'
  },

  // lower right section of the panel, contains action settings
  panel_lower_right : {
    width: '240px',
    overflow: 'hidden',
    cssFloat: 'right',
    height: '290px',
    padding: '5px'
  },

  // Formatting for the action list
  list : {
    boxSizing: 'border-box',
    overflow: 'auto'
  },

  // Format for the buttons below the action list
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
