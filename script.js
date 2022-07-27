const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Get Quotes from API by doing an asynchronous fetch request within a try/catch statement
//create global variable to store the retrieved data
let apiQuotes = [];

//Show Loading
function loading() {
  loader.hidden = false; // set attribute hidden to false first
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show New Quote from API
function newQuote() {
  loading();
  //Pick a random quote form apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote);
  //Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //Check Quote length to determine styling
  if (quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}
// //Show New Quote from localQuotes array
// function newQuote() {
//   //Pick a random quote form apiQuotes array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   console.log(quote);
// }
// newQuote();

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes[Math.floor(Math.random() * 1600)]);
    newQuote();
  } catch (error) {
    //Catch Error Here
    alert(error);
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank"); //allow open a window using twitter url in new tab
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//Rune the function
getQuotes();
