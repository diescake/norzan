import moment from 'moment'
import 'moment-duration-format'

export class Norzan {
  constructor(config, distDom) {
    this.config = config
    this.distDom = distDom
    this.intervalId = null

    this.openingTime = moment()
      .startOf('day')
      .add(config.openingTime, 'hours')

    this.closingTime = moment()
      .startOf('day')
      .add(config.closingTime, 'hours')
  }

  _updateTime() {
    const now = moment()

    if (this._isWorkingTime(now)) {
      this.distDom.innerText = this._createDateString(now)
      return
    }

    this.endTimer()
    this.distDom.innerText = this.config.messageInClosed
  }

  _isWorkingTime(now) {
    return now.isBetween(this.openingTime, this.closingTime)
  }

  _createDateString(now) {
    const duration = moment.duration(this.closingTime.diff(now))
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
