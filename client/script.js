import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form'); // select the form element
const chatContainer = document.querySelector('#chat_container'); // select the chat container element

let loadInterval; // we will use this variable to store the interval that will be used to load the chat messages

// this function will be used to create a new message element which will return three dots ... as the message

function botLoader (element) {
  element.textContent = ''; // we set the text content of the elemet to an empty string

  loadInterval = setInterval(()=> {
    element.textContent += '.'; // we add a dot to the text content of the element

    if (element.textContent === '....') {
      element.textContent = '';
      }
  }, 300);
}

// this function will be used to implement the bot's response and typing functionality

function botResponse (element, text) {
  let index = 0; // At the start of the function, we set the index variable to 0

  let interval = setInterval(()=> {
    if (index < text.length) { // this condition checks if the index is less than the length of the text which means we are still typing
      element.innerHTML += text.charAt(index); // this is going to get the character at the index position and add it to the innerHTML of the element
      index++; // we increment the index by 1

} else {
  clearInterval(interval); // we clear the interval when the index is equal to the length of the text
}
  }, 20)

}

// this function will be used to generate a unique id for every single message to be able to map through them

function generateUniqueId  () { // current time and date are used to generat unique id's
  const timestamp = Date.now(); // we get the current time and date
  const randomNumber = Math.random(); // we get a random number
  const hexadecimalString = randomNumber.toString(16); // we convert the random number to a hexadecimal string

  return `id-${timestamp}-${hexadecimalString}`; // we return the unique id

}

function chatStripe (isAi, value,uniqueId) { // this function will be used to generate a new chat stripe
  return `
  <div class="wrapper ${isAi ? 'ai' : ''}">
    <div class="chat">
      <div class="profile">
        <img 
          src="${isAi ? bot : user}"
          alt="${isAi ? 'bot' : 'user'}"
        />
      </div>
      <div class="message" id="${uniqueId}">${value}</div>
    </div>
  </div>
`;

}

// create our handle submit function which is going to trigger to get the AI generated response

 const handleSubmit =  async (event) => {
  event.preventDefault(); // we prevent the default behaviour of the form or browser

  const data = new FormData(form); // To get the data that we typed into the form

  // we want to generate a new chat stripe within our HTML for the user's message
  chatContainer.innerHTML += chatStripe(false, data.get('propmt')); // we set the innerHTML of the chat container to the chat stripe

  form.reset(); // we reset the form

  // we want to generate a new chat stripe within our HTML for the AI's message

  const uniqueId = generateUniqueId(); // we generate a unique id for the message
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId); // 

  chatContainer.scrollTop = chatContainer.scrollHeight; // we scroll to the bottom of the chat container

  const messageDiv = document.getElementById(uniqueId); // we get the message div by the unique id

  botLoader(messageDiv); // we call the bot loader function

}

form.addEventListener('submit', handleSubmit); // we add an event listener to the form which will trigger the handle submit function when the form is submitted
form.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    handleSubmit(event);
  }
})

