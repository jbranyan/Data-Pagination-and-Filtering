/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Julie Branyan
*/

/*
This function will create and insert/append the elements needed to display a "page" of nine students
*/

let header = document.querySelector('header');
let searchBox = `<label for="search" class="student-search">
               <input id="search" placeholder="Search by name...">
               <button type="button" id="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
            </label>`;

header.insertAdjacentHTML('beforeend', searchBox);


const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

let listOfResults = [];

const showPage = (list, page) =>{
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   
   if(list.length !== 0){
      for(let i = 0 ; i < list.length ; i++){
         if(startIndex <= i && i < endIndex ){
            let item = `<li class=student-item cf>
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                  <h3>${list[i].name.first}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`
            studentList.insertAdjacentHTML('beforeend', item);
         }
      }
   } else {
      // header.innerHTML += "No Results Found";
      studentList.insertAdjacentHTML('beforeend', "No results found");
   }
}

showPage(data, 1);

const paginationButtons = (list) =>{

   const numberOfButtons = Math.floor(list.length / 9) + 1;
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   
   for(let i = 1 ; i <= numberOfButtons ; i++){
      let button = ` 
      <li>
         <button type="button">${[i]}</button>
      </li>`
      linkList.insertAdjacentHTML('beforeend', button);
   }
   // Select the first pagination button and give it a class name of active.
   let name = linkList.querySelector('button');
   name.className = 'active';

   // Create an event listener to listen for clicks on the link-list 
   // variable that you created earlier.
   linkList.addEventListener('click', (event) => {
   
      if (event.target.tagName == 'BUTTON') {
         let buttonClass = document.querySelector('.active');
         buttonClass.classList.remove('active');

         let activeButton = event.target;
         activeButton.classList.add('active');

   } 
      let pageNumber = event.target.textContent;

      showPage(list, pageNumber);
    });
}

/*
This function will create and insert/append the elements needed for the pagination buttons
*/
paginationButtons(data);

const searchForStudents = (searchInput, list) =>{
   listOfResults = [];

   for(let i = 0 ; i < list.length ; i++){
      list[i].className = '';
      if(searchInput.value.length != 0 && (list[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || 
      (list[i].name.last.toLowerCase().includes(searchInput.value.toLowerCase())))){
         listOfResults.push(list[i]);
      } 
   }
   showPage(listOfResults,1);
}


/* submit listener */
submit.addEventListener('click', (event) => {
   event.preventDefault();
 
   searchForStudents(search,data);
   paginationButtons(data);

 });
 
 /* search listener */
 search.addEventListener('keyup', () => {
 
   searchForStudents(search,data);
   paginationButtons(listOfResults);
 });
