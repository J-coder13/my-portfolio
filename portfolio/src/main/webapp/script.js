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

/*
 In order to access the secret page you have to solve a randomly generated equation.
 Upon the input of a correct answer a button will appear, linking the user to the page.
 */
function secretPage(){
  //Generates a number between 1 and 200 for both numbers.
  this.a = Math.floor((Math.random()*200)+100);
  this.b = Math.floor((Math.random()*200)+100);


  //If b is a greater number we flip the values
  if(this.b > this.a){
    var hold =this.b;
    this.b = this.a;
    this.a = hold;
  }

  // This section of code includes the possible equations to solve
  this.div = function(){
    return this.a / this.b;
  }
  this.sub = function(){
    return this.a - this.b;
  }
  this.add = function(){
    return this.a + this.b;
  } 
  this.mul = function(){
    return this.a * this.b;   
  }
  
  //Checks if the answer givin is correct
  let isCorrect = false;
  
  //Generates which equation option we choose;
  let choice = Math.floor((Math.random()*4));
  
  
  let input = 0;
  let answer = 0;

//choice determines which equation the user gets 
  switch(choice){
      case 0:
        answer = this.add();
        input = prompt(this.a +' + ' + this.b + '?',0);
        if(input == answer){ 
          isCorrect = true;
        }
        break;
    
      case 1:     
        answer = this.sub();
        input = prompt(this.a +' - ' + this.b + '?',0);
        if(input == answer){  
          isCorrect = true;
        }
        break;
    
      case 2:
        answer = this.mul();
        input = prompt(this.a +' * ' + this.b + '?',0);
        if(input == answer){ 
          isCorrect = true;
        }
        break;
    
      case 3:
        answer = Math.round(this.div());
        input = prompt(this.a +' / ' + this.b + '? Rounded to the nearest Integer',0);
        if(input == answer){
          isCorrect = true;
        }
       break;

      default:
        alert("Something went wrong :( Refresh the page and try again!");
    }
   
    //The button to access the secret page is hidden until the user enters a correct answer 
    let secret = document.getElementById('secret-button');
    if(isCorrect){
        alert('Congratulations! You have unlocked my Secret.');
        secret.style.display = 'block';
    }else{
        alert("Sorry that's an incorrect answer. Better luck next time!");
    }

}

