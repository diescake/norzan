import '../style/reset.css'
import '../style/main.css'
import { Norzan } from '../js/Norzan.js'
import { defaultOption } from '../config/norzan.config.js'

const loadOption = () =>
  new Promise(resolve => {
    chrome.storage.sync.get(
      ['durationFormat', 'updateIntervalMs', 'openingTime', 'closingTime', 'messageInClosed', 'backgroundColor', 'fontColor'],
      data => {
        if (!data.durationFormat) {
          resolve(null)
        }

        resolve({
          durationFormat: data.durationFormat,
          updateIntervalMs: data.updateIntervalMs,
          openingTime: data.openingTime,
          closingTime: data.closingTime,
          messageInClosed: data.messageInClosed,
          backgroundColor: data.backgroundColor,
          fontColor: data.fontColor,
        })
      }
    )
  })

const setStyle = config => {
  const body = document.body
  const time = document.getElementById('time')

  body.style.backgroundColor = config.backgroundColor
  time.style.color = config.fontColor
}

;(async () => {
  const option = (await loadOption()) || defaultOption
  setStyle(option)

  const time = document.getElementById('time')
  const norzan = new Norzan(option, time)
  norzan.startTimer()
})()
