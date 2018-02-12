// CSS object for use within actioncard.jsx
export default {
  // Formats the container div of the card
  card : {
    padding: '6px',
    borderBottomStyle: 'dashed',
    borderWidth: '1px',
    borderColor: 'lightgray',
    height: '29px'
  },

  // Formats the image icon to the left of the text container div
  // float: Keeps the image to the left of the text
  image : {
    width: '24px',
    height: '24px',
    padding: '3px',
    paddingRight: '8px',
    float: 'left'
  },

  // Formats the top text, aka the action name
  textTop : {
    margin: '0px',
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: '15px',
    color: 'black'
  },

  // Formats the bottom text, aka  the action type
  textBottom : {
    margin: '0px',
    fontFamily: 'Roboto',
    fontWeight: '100',
    fontSize: '14px',
    color: 'black'
  }
}
