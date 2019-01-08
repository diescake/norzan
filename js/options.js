const buttonDiv = document.getElementById('buttonDiv')
const BUTTON_COLORS = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1']

const constructOptions = colors => {
  colors.forEach(color => {
    const button = document.createElement('button')
    button.style.backgroundColor = color
    button.addEventListener('click', () => {
      chrome.storage.sync.set({ color }, () => {
        console.log(`color is ${color}`)
      })
    })
    buttonDiv.appendChild(button)
  })
}

constructOptions(BUTTON_COLORS)
