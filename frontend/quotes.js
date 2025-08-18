const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

async function getQuote() {
  try {
    const response = await fetch("http://localhost:5000/api/quote");
    const data = await response.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `~ ${data.author} ~`;
  } catch (err) {
    console.error("Error fetching quote:", err);
  }
}

newQuoteBtn.addEventListener("click", getQuote);

// Load first quote on page load
getQuote();
