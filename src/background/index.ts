export {}

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, 'start')
})

/** 通信机制，在background中发送状态转换消息，在content Script中接收消息 */