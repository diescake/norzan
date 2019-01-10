const saveButton = document.getElementById('save-button')
const resetButton = document.getElementById('reset-button')

const elems = {
  durationFormat: document.getElementById('duration-format'),
  updateIntervalMs: document.getElementById('update-interval'),
  openingTime: document.getElementById('opening-time'),
  closingTime: document.getElementById('closing-time'),
  messageInClosed: document.getElementById('message-in-closed'),
  backgroundColor: document.getElementById('background-color'),
  fontColor: document.getElementById('font-color'),
}

const loadOptions = () => {
  // FIXME: simplify
  chrome.storage.sync.get(Object.keys(elems), async data => {
    if (!data.durationFormat) {
      await resetOptions()
      loadOptions()
      return
    }

    elems.durationFormat.value = data.durationFormat
    elems.updateIntervalMs.value = data.updateIntervalMs
    elems.openingTime.value = data.openingTime
    elems.closingTime.value = data.closingTime
    elems.messageInClosed.value = data.messageInClosed
    elems.backgroundColor.value = data.backgroundColor
    elems.fontColor.value = data.fontColor
  })
}

const saveOptions = () => {
  // FIXME: simplify
  if (!elems.durationFormat) {
    console.error('No value')
    return
  }

  chrome.storage.sync.set({
    durationFormat: elems.durationFormat.value,
    updateIntervalMs: elems.updateIntervalMs.value,
    openingTime: elems.openingTime.value,
    closingTime: elems.closingTime.value,
    messageInClosed: elems.messageInClosed.value,
    backgroundColor: elems.backgroundColor.value,
    fontColor: elems.fontColor.value,
  })
}
const resetOptions = async () => {
  const { defaultOption } = await import('/config/norzan.config.js')

  // FIXME: simplify
  chrome.storage.sync.set({
    durationFormat: defaultOption.durationFormat,
    updateIntervalMs: defaultOption.updateIntervalMs,
    openingTime: defaultOption.openingTime,
    closingTime: defaultOption.closingTime,
    messageInClosed: defaultOption.messageInClosed,
    backgroundColor: defaultOption.backgroundColor,
    fontColor: defaultOption.fontColor,
  })
}
saveButton.addEventListener('click', () => saveOptions())
resetButton.addEventListener('click', async () => {
  await resetOptions()
  loadOptions()
})

loadOptions()
