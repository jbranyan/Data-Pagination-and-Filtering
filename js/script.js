/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const displayStudents = (list, page) =>{
   const startIndex = (page * list.length) - list.length;
   const endIndex = page * list.length;
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
   console.log(studentList);
}

displayStudents(data, 1);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
