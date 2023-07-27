chrome.runtime.onStartup.addListener(() => {
  chrome.tabs
    .create({
      url: "http://192.168.101.38:5005/",
    })
    .then(
      async (tab: chrome.tabs.Tab) => {
        if (tab?.id) {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              window.localStorage.removeItem("token");
            },
          });

          chrome.tabs.remove(tab.id).then(
            () => console.log("Tab successfuly removed"),
            (error) => console.log(`An error occurred: ${error}`)
          );
        }
      },
      (error) => {
        console.log(`An error occurred: ${error}`);
      }
    );
});
