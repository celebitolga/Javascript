const myNameHolder = document.querySelector('#myName');
const myClockHolder = document.querySelector('#myClock');
let clockInterval = null; //Başka bir yerde sıfırlamak için
let date = null;
let userName;

const getName = () => {
     userName = prompt('İsminizi Giriniz');
}

const setNameInHtml = () => {
     myNameHolder.innerHTML = userName || 'Kodluyoruz';
}

const checkDayAndMonth = (date) => {
  return date > 9 ? date : `0${date}`
}

const calculateDate = (date) => {
  return [checkDayAndMonth(date.getMonth() + 1),
     checkDayAndMonth(date.getDate()),
     date.getFullYear()].join(':')+' '+
    [date.getHours(),
     date.getMinutes(),
     date.getSeconds()].join(':');
}

const calculateDayName = (date) => {
     return date.toLocaleDateString('tr', { weekday: 'long' })
}

function showTime() {
     clockInterval = setInterval(() => {
          date = new Date();
          myClockHolder.innerHTML = `${calculateDate(date)} ${calculateDayName(date)}`;
     }, 1000)
}


window.addEventListener('DOMContentLoaded', () => {
     showTime();
     getName();
     setNameInHtml();
});
