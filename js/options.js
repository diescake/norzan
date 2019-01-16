import { kebabCase } from 'change-case'
import { defaultOption } from '../config/norzan.config.js'

import '../style/reset.css'
import '../style/common.css'
import '../style/option.css'

const saveButton = document.getElementById('save-button')
const resetButton = document.getElementById('reset-button')

const optionKeys = Object.keys(defaultOption)

const elemTable = optionKeys.reduce((table, key) => {
  const elem = document.getElementById(kebabCase(key))
  if (!elem) {
    console.warn(`${kebabCase(key)} is not declared in options.html.`)
    return table
  }
  return { ...table, [key]: elem }
}, {})

const loadOptions = () => {
  chrome.storage.sync.get(optionKeys, option => {
    if (!option.durationFormat) {
      console.warn('Stored options are corrupted, and so run reset process.')
      resetOptions()
      loadOptions()
      return
    }
    optionKeys.forEach(key => (elemTable[key].value = option[key]))
  })
}

const saveOptions = () => {
  if (!elemTable.durationFormat) {
    console.error('No value')
    return
  }
  const option = optionKeys.reduce((table, key) => ({ ...table, [key]: elemTable[key].value }), {})
  chrome.storage.sync.set(option)
}

const resetOptions = () => chrome.storage.sync.set({ ...defaultOption })

saveButton.addEventListener('click', () => {
  saveOptions()
  history.back()
})

resetButton.addEventListener('click', () => {
  resetOptions()
  history.back()
})

loadOptions()
