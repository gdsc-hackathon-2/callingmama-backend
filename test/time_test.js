require('date-utils')
let string = "2022-03-07-22-03"
let times = string.split("-");
for(let i=0;i<5;i++){
    times[i] = parseInt(times[i]);
}
let year = times[0];
let month = times[1];
let day = times[2];
let hour = times[3];
let minute = times[4];

let date = new Date();
date.setFullYear(year);
date.setMonth(month);
date.setDate(day);
date.setHours(hour);
date.setMinutes(minute);
console.log(date.toFormat("YYYY-MM-DD HH24:MI"));