/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Julie Branyan
*/

//Place the search results box on the page within the html header
const header = document.querySelector('header');
const searchBox = `<label for="search" class="student-search">
                     <input id="search" placeholder="Search by name...">
                     <button type="button" id="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
                  </label>`;

header.insertAdjacentHTML('beforeend', searchBox);

const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

let searchResultsList = [];

// This function will create and insert/append the elements needed to display 
// a "page" of nine students
const showPage = (list, page) =>{
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   //If the list contains students, create the student information to display on the page
   if(list.length !== 0){
      for(let i = 0 ; i < list.length ; i++){
         if(startIndex <= i && i < endIndex ){
            const studentItem = `<li class=student-item cf>
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`
            studentList.insertAdjacentHTML('beforeend', studentItem);
         }
      }
      //If the list is empty, display "No Results Found" on the page
   } else {
      studentList.insertAdjacentHTML('beforeend', "No Results Found");
   }
}

showPage(data, 1);

//Function to create and display pagination buttons on the page.
const paginationButtons = (list) =>{

   const numberOfButtons = Math.floor(list.length / 9) + 1;
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   //create pagination buttons based off of number of buttons 
   //needed for students displayed on the page
   if(list.length !== 0){
      for(let i = 1 ; i <= numberOfButtons ; i++){
         const button = ` 
         <li>
            <button type="button">${[i]}</button>
         </li>`
         linkList.insertAdjacentHTML('beforeend', button);
      }
      // Set the first pagination button class name to active.
      const firstButton = linkList.querySelector('button');
      firstButton.className = 'active';
   }

   // Event listener to listen for clicks pagination buttons
   linkList.addEventListener('click', (event) => {

      //Locate button with active class within link-list and remove active  
      if (event.target.tagName == 'BUTTON') {
         const activeButton = document.querySelector('.active');
         activeButton.classList.remove('active');

         //Select the button that triggered the listener and set the class name to 'active
         const setActivebutton = event.target;
         setActivebutton.classList.add('active');

         //Set the page number to pass to show page function
         const pageNumber = event.target.textContent;
   
         showPage(list, pageNumber);
      } 
   });
}

paginationButtons(data);

//Function used to match students to dispaly based off search input
const searchForStudents = (searchInput, list) =>{
   searchResultsList = [];

   for(let i = 0 ; i < list.length ; i++){
      list[i].className = '';
      //Match the students based off the input and push the results to a the searchResultsList
      if(searchInput.value.length != 0 && (list[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || 
      (list[i].name.last.toLowerCase().includes(searchInput.value.toLowerCase())))){
         searchResultsList.push(list[i]);
      } 
   }
   showPage(searchResultsList,1);
}
// submit listener
submit.addEventListener('click', (event) => {
   event.preventDefault();

   searchForStudents(search,data);
   paginationButtons(searchResultsList);
 });

//  search keyup listener
 search.addEventListener('keyup', () => {
 
   searchForStudents(search,data);
   paginationButtons(searchResultsList);
 });