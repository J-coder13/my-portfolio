// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

//Generates a number with y being the floor and x being the ceiling
function randomNumber( x, y) {
    return Math.floor((Math.random()*x)+y);
}

/*
 * In order to access the secret page you have to solve a randomly generated equation.
 * Upon the input of a correct answer a button will appear, linking the user to the page.
 */
function secretPage(){
  //Generates a number between 1 and 200 for both numbers.
  let a = randomNumber(200, 1);
  let b = randomNumber(200, 1);


  //If b is a greater number we flip the values
  if (b > a) {
    const hold = b;
    b = a;
    a = hold;
  }
  
  //Checks if the answer givin is correct
  let isCorrect = false;
  
  //Generates which equation option we choose;
  const choice = randomNumber(4, 0);
  
  let input = 0;
  let answer = 0;

  //choice determines which equation the user gets 
  switch(choice) {
      case 0:
        answer = a + b;
        input = prompt(a + ' + ' + b + '?', 0);
        isCorrect = input == answer;
        break;
    
      case 1:     
        answer = a - b;
        input = prompt(a + ' - ' + b + '?', 0);
        isCorrect = input == answer;
        break;
    
      case 2:
        answer = a * b;
        input = prompt(a + ' * ' + b + '?', 0);
        isCorrect = input == answer;
        break;
    
      case 3:
        answer = Math.round(a / b );
        input = prompt(a + ' / ' + b + '? Rounded to the nearest Integer', 0);
        isCorrect = input == answer;
        break;

      default:
        alert("Something went wrong :( Refresh the page and try again!");
    }
   
    //The button to access the secret page is hidden until the user enters a correct answer 
    const secret = document.getElementById('secret-button');
    if (isCorrect) {
        alert('Congratulations, You have passed the test! Now click the button at the bottom to see my hidden talent');
        secret.style.display = 'block';
    } else {
        alert("Sorry that's an incorrect answer. Better luck next time!");
    }

}


function loadComment() {
  fetch('/data').then(response => response.json()).then((comments) => {
    const taskListElement = document.getElementById('comment-container');
    comments.forEach((comment) => {
      taskListElement.appendChild(createComment(comment));
    });
  });
}

function createComment(comment) {
    
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const readbleText = document.createElement('p');
  readbleText.innerText = comment.comment; 

  const nameElement = document.createElement('h3');
  nameElement.innerText = comment.name;

  commentElement.appendChild(nameElement);
  commentElement.appendChild(readbleText);

  return commentElement;
}

