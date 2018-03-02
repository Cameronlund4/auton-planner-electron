// CSS object for use within app.jsx
export default { // TODO Correct comments in this file
  screen : {
    height: "100%",
    minHeight: "100%"
  },

  // Keep the field image to the left side of the screen
  field : {
    cssFloat: 'left'
  },

  // Keep the panel to the right side of the screen and fit height
  panel : {
    overflow: 'hidden',
    width: '575px',
    cssFloat: 'right',
    height: "100%",
    minHeight: "100%",
    display: "grid"
  },

  // Upper section of the panel, contains action jsx
  panel_upper : {
    width:'564px',
    borderWidth: '1px',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderColor: 'lightgray',
    padding: '5px',
    height: '350px'
  },

  panel_lower: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "575px",
    flexGrow: "1",
    overflow: "hidden",
    height: "100%"
  },

  // Lower left section of panel, contains action list
  panel_lower_left : {
    // display: "flex",
    // flexDirection: "column",
    // flexWrap: "nowrap",
    position: 'relative',
    width: '249px',
    overflow: 'hidden',
    cssFloat: 'left',
    borderWidth: '1px',
    borderLeftStyle: 'solid',
    borderColor: 'lightgray',
    borderWidth: '1px',
    borderRightStyle: 'solid',
    borderColor: 'lightgray',
    height: "100%"
  },

  // lower right section of the panel, contains action settings
  panel_lower_right : {
    width: '329px',
    overflow: 'hidden',
    overflowY: 'auto',
    height: "100%"
  },

  action_area_top : {
    width: '100%',
    borderWidth: '1px',
    borderBottomStyle: 'solid',
    padding: '5px',
    borderColor: 'lightgray'
  },

  action_area_bottom : {
    width: '100%',
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
