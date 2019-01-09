export class Norzan {
  constructor(config, distDom) {
    this.config = config
    this.wording = config.wording
    this.distDom = distDom
    this.intervalId = null

    this.workTimeStart = moment()
      .startOf('day')
      .add(config.workTimeStart, 'hours')

    this.workTimeEnd = moment()
      .startOf('day')
      .add(config.workTimeEnd, 'hours')
  }

  _updateTime() {
    if (this._isWorkingTime()) {
      this.distDom.innerText = this._createDateString()
      return
    }

    this.endTimer()
    this.distDom.innerText = this.wording.workFinished
  }

  _isWorkingTime() {
    const now = moment()
    return now.isBetween(this.workTimeStart, this.workTimeEnd)
  }

  _createDateString() {
    const now = moment()
    const duration = moment.duration(this.workTimeEnd.diff(now))
    return duration.format(this.config.durationFormat, { trim: false })
  }

  startTimer() {
    if (this.intervalId) {
      this.endTimer()
    }
    this.intervalId = setInterval(this._updateTime.bind(this), this.config.updateIntervalMs)
  }

  endTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
