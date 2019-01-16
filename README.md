# Norzan

<p align="center">
  <img src="icon.png" alt="icon" width="1640">
</p>

Norzan is a Chrome Extension to display the rest of workable time into it's new tab. The extension allows you to represent your time to your co-workers and strongly persist that **"I don't wanna work overtime !!"**.

## Usage

Currently, this extension is not published to Chrome Web Store. Please clone this repository and load as a unpacked extension. See the official tutorial for Chrome Extensions [Getting Started Tutorial](https://developer.chrome.com/extensions/getstarted)

## Development

Generate production codes and collect assets under the `dist/prod` directory. If you want to run in your Chrome browser, load the `prod` directory as top of unpacked Chrome Extension.

```js
$ yarn build
```

## Config

```js
{
  durationFormat: 'hh:mm:ss.SS', // See. Moment.js format
  updateIntervalMs: 90,
  openingTime: '10:30:00',
  closingTime: '19:00:00',
  messageInClosed: 'During non-business hours.',
  backgroundColor: '#222222', // Actually, input from the color picker in your browser.
  fontColor: '#e3e3e3',
}
```
