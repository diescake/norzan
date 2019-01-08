const buttonDiv = document.getElementById('buttonDiv')
const BUTTON_COLORS = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1']

const createSettingColorButton = color => {
  const button = document.createElement('button')
  button.style.backgroundColor = color
  button.addEventListener('click', () => {
    chrome.storage.sync.set({ color }, () => {
      console.log(`color is ${color}`)
    })
  })
  return button
}

const constructButtons = () => BUTTON_COLORS.forEach(color => buttonDiv.appendChild(createSettingColorButton(color)))

constructButtons()
