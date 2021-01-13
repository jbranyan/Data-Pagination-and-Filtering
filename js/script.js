/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Julie Branyan
*/

/*
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) =>{
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

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
   let name = document.querySelector('button');
   name.className = 'active';

   // Create an event listener to listen for clicks on the link-list 
   // variable that you created earlier.
   linkList.addEventListener('click', (event) => {

   if (event.target.tagName == 'BUTTON') {
      //Remove the active class from pagination button
      let buttonClass = linkList.querySelector('.active');
      buttonClass.className = '';

      //Add the active class to the pagination button that fired the event
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
