import { Norzan } from '../js/Norzan.js'
import { defaultOption } from '../config/norzan.config.js'

import '../style/reset.css'
import '../style/common.css'
import '../style/main.css'

const elems = {
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
  elems.body.style.backgroundColor = option.backgroundColor
  elems.time.style.color = option.fontColor
}

;(async () => {
  const option = (await loadOption()) || defaultOption
  setStyle(option)

  const norzan = new Norzan(option, elems.time)
  norzan.startTimer()
})()
