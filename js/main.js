(async () => {
  const { Norzan } = await import('/js/Norzan.js')
  const { norzanConfig } = await import('/config/norzan.config.js')

  const time = document.getElementById('time')
  const norzan = new Norzan(norzanConfig, time)
  norzan.startTimer()
})()
