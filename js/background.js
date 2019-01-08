const removeRulesWithPromise = () =>
  new Promise(resolve => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, resolve)
  })

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green')
  })

  removeRulesWithPromise().then(() => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: 'developer.chrome.com',
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ])
  })
})
