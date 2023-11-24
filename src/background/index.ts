export enum Phase {
  None = 0,
  Catching,
  Editing,
  Finished
}

class PhaseManager {
  private _current = Phase.None
  tabId: number

  get current () { return this._current }
  set current (value) {
    this._current = value > Phase.Finished ? Phase.None : value
    chrome.tabs.sendMessage(this.tabId, this._current)
  }
  
  // 控制事件的发送？
  constructor () {}
  /** 进行下一步 */
  next (id: chrome.tabs.Tab['id']) {
    this.tabId = id
    this.current++
  }

  exit () {
    this.current = Phase.None
  }
}

const phaseManager = new PhaseManager()

chrome.action.onClicked.addListener((tab) => {
  // phaseManager.next(tab.id)
})

chrome.commands.onCommand.addListener((command, tab) => {

})


// catching需要通过chorm.tabs.captureVisible异步截图，然后传递给CS