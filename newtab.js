;(async function() {
  const currTab = await browser.tabs.getCurrent()
  console.log(currTab)
  browser.webNavigation.onBeforeNavigate.addListener(e => {
    console.log(e)
    if (e.tabId === currTab.id && e.frameId !== 0 && e.parentFrameId === 0) {
      console.log("loading", e.url)
      window.location.href = e.url
    }
  })
})()
