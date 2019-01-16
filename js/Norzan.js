import moment from 'moment'
import 'moment-duration-format'

export class Norzan {
  constructor(option, outDom) {
    this.option = option
    this.outDom = outDom
    this.intervalId = ''

    this.openingTime = moment(option.openingTime, moment.HTML5_FMT.TIME_SECONDS)
    this.closingTime = moment(option.closingTime, moment.HTML5_FMT.TIME_SECONDS)
  }

  _updateTime() {
    const now = moment()

    if (this._isWorkingTime(now)) {
      this.outDom.innerText = this._createDateString(now)
      return
    }

    this.endTimer()
    this.outDom.innerText = this.option.messageInClosed
  }

  _isWorkingTime(now) {
    return now.isBetween(this.openingTime, this.closingTime)
  }

  _createDateString(now) {
    const duration = moment.duration(this.closingTime.diff(now))
    return duration.format(this.option.durationFormat, { trim: false })
  }

  startTimer() {
    if (this.intervalId) {
      this.endTimer()
    }
    this.intervalId = setInterval(this._updateTime.bind(this), this.option.updateIntervalMs)
  }

  endTimer() {
    if (!this.intervalId) {
      return
    }
    clearInterval(this.intervalId)
    this.intervalId = ''
  }
}
