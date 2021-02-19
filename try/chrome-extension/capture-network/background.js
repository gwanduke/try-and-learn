chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log("onBeforeRequest", details);
  },
  { urls: [] }
);
chrome.webRequest.onCompleted.addListener(
  function (details) {
    console.log("onCompleted", details, details.responseHeaders);
  },
  { urls: [] }
);
