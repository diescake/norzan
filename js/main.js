const loadOption = () =>
  new Promise(resolve => {
    chrome.storage.sync.get(
      ['durationFormat', 'updateIntervalMs', 'openingTime', 'closingTime', 'messageInClosed', 'backgroundColor', 'fontColor'],
      data => {
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
  const { Norzan } = await import('/js/Norzan.js')
  let option = await loadOption()
  if (!option.durationFormat) {
    option = await import('/config/norzan.config.js')
  }

  setStyle(option)

  const time = document.getElementById('time')
  const norzan = new Norzan(option, time)
  norzan.startTimer()
})()
