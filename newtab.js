;(async function() {
  // Find out what the homepage is set to
  const homepageRaw = (await browser.browserSettings.homepageOverride.get({}))
    .value
  const homepage = /^https?:\/\//.test(homepageRaw)
    ? homepageRaw
    : "http://" + homepageRaw
  document.querySelector("iframe").src = homepage

  // When we navigate away from the homepage, navigate the top level instead
  const currTab = await browser.tabs.getCurrent()
  browser.webNavigation.onBeforeNavigate.addListener(e => {
    console.log(e)
    if (e.tabId === currTab.id && e.frameId !== 0 && e.parentFrameId === 0) {
      window.location.href = e.url
    }
  })
})()
