import { Norzan } from '../js/Norzan.js'
import { defaultOption } from '../config/norzan.config.js'
import WebFont from 'webfontloader'

import '../style/common.css'
import '../style/main.css'

const elemTable = {
  body: document.body,
  time: document.getElementById('time'),
}

const loadOption = () =>
  new Promise(resolve => {
    chrome.storage.sync.get(Object.keys(defaultOption), data => {
      resolve(data.durationFormat ? { ...data } : null)
    })
  })

const setStyle = option => {
  elemTable.body.style.backgroundColor = option.backgroundColor
  elemTable.time.style.color = option.fontColor

  if (!option.googleFont) {
    return
  }

  WebFont.load({
    google: {
      families: [option.googleFont]
    },
    timeout: 2000,
    fontactive: fontFamily => {
      console.log(`${fontFamily} load completed.`)
      elemTable.time.style.fontFamily = option.googleFont
    }
  })
}

;(async () => {
  const option = (await loadOption()) || defaultOption
  setStyle(option)

  const norzan = new Norzan(option, elemTable.time)
  norzan.startTimer()
})()
