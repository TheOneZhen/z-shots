export enum StatePhase {
  None = 0,
  Catching,
  Editing,
  Finished
}

export class StateManage {
  current: StatePhase = StatePhase.None

  constructor () {}
  /** 进行下一步 */
  next () {}

  exit () {
    this.current = StatePhase.None
  }
}