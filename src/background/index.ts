import { StatePhase } from "~shared/state"

chrome.action.onClicked.addListener((tab) => {
  console.log('this tab is', tab)
  chrome.tabs.sendMessage(tab.id, 'start')
})

chrome.commands.onCommand.addListener((command, tab) => {
  
})
