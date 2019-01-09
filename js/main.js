const setStyle = style => {
  const body = document.body
  const time = document.getElementById('time')

  body.style.backgroundColor = style.backgroundColor
  time.style.color = style.fontColor
}

;(async () => {
  const { Norzan } = await import('/js/Norzan.js')
  const { norzanConfig } = await import('/config/norzan.config.js')

  setStyle(norzanConfig.style)

  const time = document.getElementById('time')
  const norzan = new Norzan(norzanConfig, time)
  norzan.startTimer()
})()
