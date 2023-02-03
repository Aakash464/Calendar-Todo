const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventContainer = document.querySelector(".events"),
    addEventSubmit = document.querySelector(".add-event-btn");


let today = new Date();
console.log(today);
let activeDay;
let month = today.getMonth();
console.log(month);
let year = today.getFullYear();
console.log(year);

const months = [
    "Januarary",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "JNovember",
    "December",
];

// const eventsArr = [
//     {
//         day: 20,
//         month: 1,
//         year: 2023,
//         events: [
//             {
//                 title: "Event 1 Happy Birthday",
//                 time: "10:00 AM",
//             },
//             {
//                 title: "Event 2 ",
//                 time: "11:00 AM",
//             },
//         ],
//     },
//     {
//         day: 22,
//         month: 1,
//         year: 2023,
//         events: [
//             {
//                 title: "Event 1 Happy Birthday",
//                 time: "10:00 AM",
//             },
//         ],
//     },
// ];
let eventsArr = []
// Function to add days into the Calendar

    // To get days from prev months , current months and to render next month days

function initCalendar(){
    const firstDay = new Date(year , month,1);
    const lastDay = new Date(year , month + 1, 0);
    const prevLastDay = new Date(year , month , 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // To update date in top of calendar

    date.innerHTML = months[month] + " " + year;

    // adding on calendar

  let days = "";

 for (let x = day; x > 0; x--) {
        
    days += `<div class = "day prev-date ">${prevDays - x+1}</div>`;

}
    

    // current month days
    for(let i = 1; i<=lastDate;i++){

        let event = false;
        eventsArr.forEach((eventobj)=>{
            if(eventobj.day === i && eventobj.month === month+1 && eventobj.year === year){
                event = true;
            }
        })

        // if th day is today add class today
        if(i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
            activeDay = i;
            getActiveDay(i);
            updateEvent(i);
            if(event){
                days += `<div class = "day today active event">${i}</div>`;
            }
            else{
                days += `<div class = "day today active">${i}</div>`;
            }
        }
        // remaining days
        else{
            if(event){
                days += `<div class = "day event">${i}</div>`;
            }
            else{
                days += `<div class = "day">${i}</div>`;
            }
        }
        

    }
   
    // next month days
    for(let j =1; j <= nextDays ;j++){
        console.log(j);
        days += `<div class = "day next-date ">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    // add event Listener after initializing calendar
    addListener();
}
initCalendar();

// prev month

function prevMonth(){
    month--;
    if(month<0){
        year--;
        month = 11;
    }
    initCalendar();
}

function nextMonth(){
    month++;
    if(month>11){
        month = 0;
        year++;
    }
    initCalendar();
}

// add event to prev and next button

prev.addEventListener("click",prevMonth);
next.addEventListener("click",nextMonth);


// function for today-btn

function todayFinder(){
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
}

todayBtn.addEventListener("click",todayFinder);

function dateInputFunc(e){
    // allows only numbers
    dateInput.value = dateInput.value.replace(/[^0-9/]/g,"");
    if(dateInput.value.length === 2){
        // to add a slash after two numbers ex:21/
        dateInput.value += '/';
    }
    if(dateInput.value.length > 7){
        // it will not allow morethan 7 characters
        dateInput.value = dateInput.value.slice(0,7);
    }
    // if(e.inputType === "deleteContentBackward"){
    //     // alert("U r Deleting");
    //     if(dateInput.value.length === 3){
    //         dateInput.value = dateInput.value.slice(0,2);
    //     }
    // }
}

dateInput.addEventListener("keyup",dateInputFunc);


function gotoB(){
    const dateArr = dateInput.value.split("/");
    
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0]-1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Invalid date");
}

gotoBtn.addEventListener("click",gotoB);

const addEventBtn = document.querySelector(".add-btn"),
addEventContainer = document.querySelector(".add-event"),
addEventCloseBtn = document.querySelector(".close"),
addEventTitle = document.querySelector(".event-name"),
addEventFrom = document.querySelector(".event-time-from"),
addEventTo = document.querySelector(".event-time-to");


addEventBtn.addEventListener("click",()=>{
    addEventContainer.classList.toggle("active");
})

addEventCloseBtn.addEventListener("click",function(){
    addEventContainer.classList.remove("active");
})

document.addEventListener("click",(e)=>{

    // to close if clicked outside
    if(e.target != addEventBtn && !addEventContainer.contains(e.target)){
        addEventContainer.classList.remove("active");
    }
})

// alow only 30 char for title

addEventTitle.addEventListener("input",()=>{
    addEventTitle.value = addEventTitle.value.slice(0,30);
})

// only time in from and to

addEventFrom.addEventListener("input",(e)=>{
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g,"");
    if(addEventFrom.value.length === 2){
        addEventFrom.value += ":";
    }
    if(addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0,5);
    }
})

addEventTo.addEventListener("input",(e)=>{
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g,"");

    if(addEventTo.value.length === 2){
        addEventTo.value += ":";
    }
    if(addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0,5);
    }
})

// adding listener after a day is rendered

function addListener(){
    const days = document.querySelectorAll(".day");
    days.forEach((day)=>{
        day.addEventListener("click",(e)=>{
            // setting the current day as active
            activeDay = Number(e.target.innerHTML);
            getActiveDay(e.target.innerHTML);
            updateEvent(Number(e.target.innerHTML));
            // to remove active from already active day
            days.forEach((day)=>{
                day.classList.remove("active");
            });
            if(e.target.classList.contains("prev-date")){
                prevMonth();

                setTimeout(()=>{
                    // selecting all days of the month
                    const days = document.querySelectorAll(".day");
                    days.forEach((day)=>{
                        if(!day.classList.contains("prev-date")&& day.innerHTML === e.target.innerHTML){
                           day.classList.add("active");
                        }
                    });
                },100);
            }
            // next month days
            else if(e.target.classList.contains("next-date")){
                nextMonth();

                setTimeout(()=>{
                    // selecting all days of the month
                    const days = document.querySelectorAll(".day");
                    days.forEach((day)=>{
                        if(!day.classList.contains("next-date")&& day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                },100);
            }
            // remaining days
            else{
                e.target.classList.add("active");
            }
        });
    });
}

// date and day in right side
function getActiveDay(date){
    const day = new Date(year,month,date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year; 
}

//functions to show events of that day

function updateEvent(date){
    let events = "";
    eventsArr.forEach((event)=>{
        // only for active days
        if(date === event.day && month+1 === event.month && year === event.year){
            // displaying event on document
            event.events.forEach((event)=>{
                events += `
                <div class="event">
                <div class="title">
                    <i class="fas fa-circle"></i>
                    <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                    <span class="event-time">${event.time}</span>
                </div>
            </div>
            `;
            });
        }

    });

    // if nothing found
    if((events === "")){
        events = `<div class="no-event">
        <h3>No Events</h3>
    </div>`;
    }
    eventContainer.innerHTML = events;
}

// function to add events

addEventSubmit.addEventListener("click",()=>{
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    // validations
    if(eventTitle === "" || eventTimeFrom === "" || eventTimeTo === ""){
        alert("Please Fill all the fields");
    }

    const eventTimeFromArr = eventTimeFrom.split(":");
    const eventTimeToArr = eventTimeTo.split(":");

    if(eventTimeFromArr.length != 2 || eventTimeToArr.length != 2 || eventTimeFromArr[0] > 23 || eventTimeToArr[0] > 23 || eventTimeFromArr[1] > 59 || eventTimeToArr[1] > 59){
        alert("Invalid Time Format");
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);


    const newEvent = {
        title: eventTitle,
        time: timeFrom+" - "+timeTo,
    };

    // check if eventsArr not empty
    let eventAdded = false;
    if(eventsArr.length > 0 ){
        // check if the current day has any events, if it has we will nedd to add it
        
        eventsArr.forEach((item) => {
            if(item.day === activeDay && item.month === month+1 && item.year === year){
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
   
    }

    // if event array empty or current day has no events we need to create new

    if(!eventAdded){
        eventsArr.push({
            day:activeDay,
            month:month+1,
            year:year,
            events:[newEvent],
        });
    }

    addEventContainer.classList.remove("active");

    // clearing the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    //show current added event

    updateEvent(activeDay);

    // also add event class to newly added day if not alreaady

    const activeDayElem = document.querySelector(".day.active");
    if(!activeDayElem.classList.contains("event")){
        activeDayElem.classList.add("event");
    }

});

function convertTime(time){
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour =timeHour%12 || 12;
    time = timeHour+" "+timeMin+" "+timeFormat;
    return time;
}

// function to remove events on click

eventContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("event")){
        const eventTitle = e.target.children[0].children[1].innerHTML;
        // get the title of event than search in array by title and delete
        eventsArr.forEach((event)=>{
            if(event.day === activeDay && event.month === month+1 && event.year === year){
                event.events.forEach((item,index)=>{
                    if(item.title === eventTitle){
                        event.events.splice(index,1);
                    }
                });
                if(event.events.length === 0){
                    eventsArr.splice(eventsArr.indexOf(event),1);
                    // after remove complete day also remove active class of the day
                    
                    const activeDayElem = document.querySelector(".day-active");
                    if(activeDayElem.classList.contains("event")){
                        activeDayElem.classList.remove("event");
                    }
                }
            }
        });
        // after removing from array update event
        updateEvent(activeDay);

    }
});

