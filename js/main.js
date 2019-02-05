import { Norzan } from '../js/Norzan.js'
import { defaultOption } from '../config/norzan.config.js'

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
}

;(async () => {
  const option = (await loadOption()) || defaultOption
  setStyle(option)

  const norzan = new Norzan(option, elemTable.time)
  norzan.startTimer()
})()
