// Initial quotes array with categories
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Perseverance" },
    { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    const quoteText = document.createElement('p');
    quoteText.textContent = quote.text;
    quoteDisplay.appendChild(quoteText);

    const quoteAuthor = document.createElement('p');
    quoteAuthor.textContent = `— ${quote.category}`;
    quoteAuthor.className = 'quote-author';
    quoteDisplay.appendChild(quoteAuthor);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Function to create and add the quote form to the DOM
function createAddQuoteForm() {
    const formContainer = document.getElementById('addQuoteForm');
    formContainer.innerHTML = '';

    const inputQuoteText = document.createElement('input');
    inputQuoteText.id = 'newQuoteText';
    inputQuoteText.type = 'text';
    inputQuoteText.placeholder = 'Enter a new quote';
    formContainer.appendChild(inputQuoteText);

    const inputQuoteCategory = document.createElement('input');
    inputQuoteCategory.id = 'newQuoteCategory';
    inputQuoteCategory.type = 'text';
    inputQuoteCategory.placeholder = 'Enter quote category';
    formContainer.appendChild(inputQuoteCategory);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
    formContainer.appendChild(addButton);
}

// Add event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial setup
createAddQuoteForm();
showRandomQuote();
