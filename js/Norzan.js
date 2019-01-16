import moment from 'moment'
import 'moment-duration-format'

export class Norzan {
  constructor(config, outDom) {
    this.config = config
    this.outDom = outDom
    this.intervalId = ''

    this.openingTime = moment(config.openingTime, moment.HTML5_FMT.TIME_SECONDS)
    this.closingTime = moment(config.closingTime, moment.HTML5_FMT.TIME_SECONDS)
  }

  _updateTime() {
    const now = moment()

    if (this._isWorkingTime(now)) {
      this.outDom.innerText = this._createDateString(now)
      return
    }

    this.endTimer()
    this.outDom.innerText = this.config.messageInClosed
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
      this.intervalId = ''
    }
  }
}
