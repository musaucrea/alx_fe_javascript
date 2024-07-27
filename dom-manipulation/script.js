// Initial quotes array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Perseverance" },
    { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" }
];

// Load and display quotes based on the selected category
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const filteredQuotes = categoryFilter === 'all' ? quotes : quotes.filter(quote => quote.category === categoryFilter);
    displayQuotes(filteredQuotes);
}

// Display quotes in the DOM
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    quotesToDisplay.forEach(quote => {
        const quoteText = document.createElement('p');
        quoteText.textContent = quote.text;
        quoteDisplay.appendChild(quoteText);

        const quoteCategory = document.createElement('p');
        quoteCategory.textContent = `— ${quote.category}`;
        quoteCategory.className = 'quote-author';
        quoteDisplay.appendChild(quoteCategory);
    });
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        updateCategories();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
        filterQuotes();
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

// Function to export quotes as a JSON file
function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
            quotes = importedQuotes;
            saveQuotes();
            updateCategories();
            filterQuotes();
            alert('Quotes imported successfully!');
        } else {
            alert('Invalid JSON format. Quotes not imported.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Update category dropdown based on existing quotes
function updateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category));
    
    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Initialize the app
createAddQuoteForm();
updateCategories();
filterQuotes();
document.getElementById('newQuote').addEventListener('click', filterQuotes);
document.getElementById('exportQuotes').addEventListener('click', exportToJson);


