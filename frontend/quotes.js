const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

// Backend route
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

/ ✅ Handle add-quote form submission
const addQuoteForm = document.getElementById("add-quote-form");
const newQuoteInput = document.getElementById("new-quote-text");
const newAuthorInput = document.getElementById("new-quote-author");
const feedback = document.getElementById("form-feedback");

addQuoteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const quote = newQuoteInput.value.trim();
  const author = newAuthorInput.value.trim();

  if (!quote || !author) {
    feedback.textContent = "Please enter both a quote and an author.";
    feedback.style.color = "red";
    return;
  }

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, author }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add quote");
    }

    feedback.textContent = "✅ Quote added successfully!";
    feedback.style.color = "green";

    // clear form
    newQuoteInput.value = "";
    newAuthorInput.value = "";
  } catch (err) {
    console.error("Error adding quote:", err);
    feedback.textContent = "❌ Could not add the quote.";
    feedback.style.color = "red";
  }
});


// Load first quote on page load
getQuote();
