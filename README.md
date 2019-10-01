# Sunrise Noon Sunset Midnight
It shows sunrise, noon, sunset, and midnight hours of your location based on your location and date, useful for day/night modes.

## Install
```
npm install sunrise-noon-sunset-midnight
```
## How to Use

First, it should be imported after installing.

```js
const sunriseNoonSunsetMidnight = require('sunrise-noon-sunset-midnight');
```

Then, it should be initialized.

```js
sunriseNoonSunsetMidnight.init(<Latitude>, <Longitude>, <date>);
```

`<latitude>` latitude of your location in degree (optional) - default = 0

`<Longitude>` longitude of your location in degree (optional) - default = 0

`<date>` the given date for calculation (optional) - default = now()

## functions
### Sunrise

```js
sunriseNoonSunsetMidnight.sunrise();
```

It returns a date object shows sunrise hour of given date. 

### Sunset

```js
sunriseNoonSunsetMidnight.sunset();
```

It returns a date object shows sunset hour of given date. 

### Noon

```js
sunriseNoonSunsetMidnight.noon();
```

It returns a date object shows noon hour of given date. 

### Midnight

```js
sunriseNoonSunsetMidnight.midnight();
```

It returns a date object shows midnight hour of given date. 

### isDay

```js
sunriseNoonSunsetMidnight.isDay();
```

Returs a boolean that shows is the given date a night or day.

## Sample Code
```js
const sunriseNoonSunsetMidnight = require('sunrise-noon-sunset-midnight');

sunriseNoonSunsetMidnight.init(44.4056, 8.9463);
const sunrise = sunriseNoonSunsetMidnight.sunrise();
const noon = sunriseNoonSunsetMidnight.noon();
const sunset = sunriseNoonSunsetMidnight.sunset();
const midnight = sunriseNoonSunsetMidnight.midnight();

console.log(`Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()} ${sunrise.getDate()}-${sunrise.getMonth()+1}`);
console.log(`Noon: ${noon.getHours()}:${noon.getMinutes()} ${noon.getDate()}-${noon.getMonth()+1}`);
console.log(`Sunset: ${sunset.getHours()}:${sunset.getMinutes()} ${sunset.getDate()}-${sunset.getMonth()+1}`);
console.log(`Midnight: ${midnight.getHours()}:${midnight.getMinutes()} ${midnight.getDate()}-${midnight.getMonth()+1}`);
console.log(`Is Day: ${sunriseNoonSunsetMidnight.isDay()}`);
```

## Equations

For finding the equations for finding how to works:

https://en.wikipedia.org/wiki/Sunrise_equation