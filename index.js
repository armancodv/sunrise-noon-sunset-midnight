exports = module.exports;

exports.init = function(latitude = 0, longitude = 0, date = new Date()) {
    this.date = date;
    this.latitude = latitude;
    this.longitude = longitude;
};

exports.julianDate = function() {
    let date = this.date;
    return Math.floor((date / 86400000) - (date.getTimezoneOffset() / 1440) + 2440587.5);
};

exports.dateSince2000 = function() {
    let julianDate = this.julianDate();
    return julianDate - 2451545.0 + 0.0008;
};

exports.meanSolarNoon = function() {
    let dateSince2000 = this.dateSince2000();
    let longitude = this.longitude;
    return dateSince2000 - longitude/360;
};

exports.solarMeanAnomaly = function() {
    let meanSolarNoon = this.meanSolarNoon();
    return 357.5291 + 0.98560028 * meanSolarNoon; // degree
};

exports.equationOfTheCenter = function() {
    let solarMeanAnomaly = this.solarMeanAnomaly()*Math.PI/180;
    return 1.9148*Math.sin(solarMeanAnomaly) + 0.0200*Math.sin(2*solarMeanAnomaly) + 0.0003*Math.sin(3*solarMeanAnomaly);
};

exports.eclipticLongitude = function() {
    let solarMeanAnomaly = this.solarMeanAnomaly();
    let equationOfTheCenter = this.equationOfTheCenter();
    return solarMeanAnomaly + equationOfTheCenter + 180 + 102.9372; // degree
};

exports.solarTransit = function() {
    let meanSolarNoon = this.meanSolarNoon();
    let solarMeanAnomaly = this.solarMeanAnomaly()*Math.PI/180;
    let eclipticLongitude = this.eclipticLongitude()*Math.PI/180;
    return 2451545 + meanSolarNoon + 0.0053 * Math.sin(solarMeanAnomaly) - 0.0069*Math.sin(2*eclipticLongitude);
};

exports.declinationOfTheSun = function() {
    let eclipticLongitude = this.eclipticLongitude()*Math.PI/180;
    return Math.asin(Math.sin(eclipticLongitude)*Math.sin(23.44*Math.PI/180))*180/Math.PI; // degree
};

exports.hourAngle = function() {
    let latitude = this.latitude;
    let declinationOfTheSun = this.declinationOfTheSun()*Math.PI/180;
    return Math.acos((Math.sin(-0.83*Math.PI/180)-Math.sin(latitude)*Math.sin(declinationOfTheSun))/(Math.cos(latitude)*Math.cos(declinationOfTheSun)))*180/Math.PI; // degree
};

exports.sunriseJulian = function() {
    let solarTransit = this.solarTransit();
    let hourAngle = this.hourAngle();
    return solarTransit - hourAngle/360;
};

exports.sunsetJulian = function() {
    let solarTransit = this.solarTransit();
    let hourAngle = this.hourAngle();
    return solarTransit + hourAngle/360;
};

exports.noon = function() {
    let date = this.date;
    let julianDate = this.julianDate();
    let solarTransit = this.solarTransit();
    let total = ((solarTransit - julianDate - date.getTimezoneOffset() / 1440)*24 + 12);
    return this.hoursToDate(total);
};

exports.midnight = function() {
    let date = this.date;
    let julianDate = this.julianDate();
    let solarTransit = this.solarTransit() + 0.5;
    let total = ((solarTransit - julianDate - date.getTimezoneOffset() / 1440)*24 + 12);
    return this.hoursToDate(total);
};

exports.sunrise = function() {
    let date = this.date;
    let julianDate = this.julianDate();
    let sunriseJulian = this.sunriseJulian();
    let total = ((sunriseJulian - julianDate - date.getTimezoneOffset() / 1440)*24 + 12);
    return this.hoursToDate(total);
};

exports.sunset = function() {
    let date = this.date;
    let julianDate = this.julianDate();
    let sunsetJulian = this.sunsetJulian();
    let total = ((sunsetJulian - julianDate - date.getTimezoneOffset() / 1440)*24 + 12);
    return this.hoursToDate(total);
};

exports.isDay = function() {
    let date = this.date;
    let sunrise = this.sunrise();
    let sunset = this.sunset();
    return ((date > sunrise)&&(date < sunset))
};

exports.hoursToDate = function hoursToDate(total) {
    let hours = Math.floor(total);
    let minutes = Math.floor((total - hours) * 60);
    let seconds = Math.floor((total - hours - minutes / 60) * 3600);
    return new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), hours, minutes, seconds);
};