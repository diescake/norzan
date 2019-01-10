# Norzan

<p align="center">
  <img src="icon.png" alt="icon" width="820" height="312">
</p>

Norzan is a Chrome Extension to display the rest of workable time into it's new tab. The extension allows you to represent your time to your co-workers and strongly persist that **"I don't wanna work overtime !!"**.

## Usage

Currently, this extension is not published to Chrome Web Store. Please clone this repository and load as a unpacked extension. See the official tutorial for Chrome Extensions [Getting Started Tutorial](https://developer.chrome.com/extensions/getstarted)

## Config

```js
{
  durationFormat: 'hh:mm:ss.SS', // See. Moment.js format
  updateIntervalMs: 90,
  openingTime: 10.5, // It means AM 10:30
  closingTime: 19.0, // It means PM 07:00
  messageInClosed: '本日の業務は終了しました。',
  backgroundColor: '#222',
  fontColor: '#e3e3e3',
}
```
