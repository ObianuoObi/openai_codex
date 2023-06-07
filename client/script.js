import bot from '/assets/bot.svg';
import user from '/assets/user.svg';

const form = document.querySelector('form'); // select the form element
const chatContainer = document.querySelector('#chat_container'); // select the chat container element

let loadInterval; // we will use this variable to store the interval that will be used to load the chat messages

// this function will be used to create a new message element which will return three dots ... as the message

botLoader = (element) => {
  element.textContent = ''; // we set the text content of the elemet to an empty string

  loadInterval = setInterval(()=> {
    element.textContent += '.'; // we add a dot to the text content of the element

    if (element.textContent === '....') {
      element.textContent = '';
      }
  }, 300);
}

// this function will be used to implement the bot's response and typing functionality

botResponse = (element, text) => {
  let index = 0; // At the start of the function, we set the index variable to 0

  let interval = setInterval(()=> {
    if (index < text.length) { // this condition checks if the index is less than the length of the text which means we are still typing
      element.innerHTML += text.chartAt(index); // this is going to get the character at the index position and add it to the innerHTML of the element
      index++; // we increment the index by 1

} else {
  clearInterval(interval); // we clear the interval when the index is equal to the length of the text
}
  }, 20)

}

// this function will be used to generate a unique id for every single message to be able to map through them

generateUniqueId = () => { // current time and date are used to generat unique id's
  const timestamp = Date.now(); // we get the current time and date
  const randomNumber = Math.random(); // we get a random number
  const hexadecimalString = randomNumber.toString(16); // we convert the random number to a hexadecimal string

  return `id-${timestamp}-${hexadecimalString}`; // we return the unique id

}
