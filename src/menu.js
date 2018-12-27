export var menuJson = [
      {
          label: 'File',
          submenu: [
              {label:'Open'},
              {type:'separator'},
              {label:'Save'},
              {label:'Save As'},
              {type:'separator'},
              {label:'Exit',
                click() {
                    app.quit() 
                }
              }
          ]
      }
  ]
