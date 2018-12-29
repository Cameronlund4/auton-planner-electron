export var menuJson = [
      {
          label: 'File',
          submenu: [
              {label:'Open'},
              {type:'separator'},
              {label:'Save'},
              {label:'Save As'},
              {type:'separator'},
              {role:'quit'},
              {label: 'test',
              click: () => { mainWindow.webContents.send('createActionAtEnd') }}
          ]
      }
  ]
