// http://api.weatherapi.com/v1/current.json?key=f3d74f57cb1c4636aa370607241212&q=mumbai&aqi=no

const tempfield = document.querySelector(".temp");
const locfield = document.querySelector(".temploc p");
const dateandtimefield = document.querySelector(".temploc span");
const conditionfield = document.querySelector(".condition");
const searchfield = document.querySelector(".searcharea");
const form = document.querySelector("form");
var slider_img = document.querySelector(".image img");
var images = ['clear.png', 'mist.png', 'overcast.png', 'sunny.png','heavyrain.png','partialrain.png'];
var i=0

form.addEventListener("submit", seachLoc);

let target = "Mumbai";
const fetchResult = async (targetloc) => {
   let url = `https://api.weatherapi.com/v1/current.json?key=f3d74f57cb1c4636aa370607241212&q=${targetloc}&aqi=no`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  let locname = data.location.name;
  let time = data.location.localtime;
  let loctemp = data.current.temp_c;
  let loccond = data.current.condition.text;
  updateDetail(locname, time, loctemp, loccond);
};
function updateDetail(locname, time, loctemp, loccond) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];
  let currentday=(currday(new Date(splitDate).getDay()))
  tempfield.innerHTML = loctemp;
  locfield.innerHTML = locname;
  conditionfield.innerHTML = loccond;
  dateandtimefield.innerHTML = `${splitDate} ${currentday} ${splitTime}`;
  slider_img.setAttribute('src',setimage(loccond));
}
function setimage(cond) {
    cond = cond.toLowerCase(); 
    switch (cond) {
        case 'clear':
            return images[0];
        case 'mist':
            return images[1];
        case 'overcast':
            return images[2];
        case 'sunny':
            return images[3];
        case 'heavy rain':
            return images[4];
        case 'partly cloudy':
            return images[2];
       case 'patchy rain nearby':
            return images[5];
        default:
            return images[0]; 
    }
}
function seachLoc(e) {
  e.preventDefault();
  target = searchfield.value;
  fetchResult(target);
}
function currday(number) {
  switch (number) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednusday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    default:
      break;
  }
}
