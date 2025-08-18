const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

// Updated to match your backend route
const backendURL = "https://luke-quote-app-backend.hosting.codeyourfuture.io/api/quote";

async function getQuote() {
  try {
    const response = await fetch(backendURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `~ ${data.author} ~`;
  } catch (err) {
    console.error("Error fetching quote:", err);
    quoteText.textContent = "Oops! Could not load a quote.";
    quoteAuthor.textContent = "";
  }
}

newQuoteBtn.addEventListener("click", getQuote);

// Load first quote on page load
getQuote();
