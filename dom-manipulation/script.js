// Initialize quotes array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    document.getElementById('quoteDisplay').innerHTML = `
        <p><strong>Quote:</strong> ${randomQuote.text}</p>
        <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;
}

// Function to create and display the add quote form
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formContainer);
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    if (quoteText && quoteCategory) {
        const newQuote = {
            text: quoteText,
            category: quoteCategory
        };

        quotes.push(newQuote);
        saveQuotes();
        populateCategories();
        showRandomQuote();
    } else {
        alert('Please enter both quote and category.');
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to populate categories in the filter dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category));
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    filterQuotes();
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastSelectedCategory', selectedCategory);

    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    const display = document.getElementById('quoteDisplay');
    display.innerHTML = filteredQuotes.length 
        ? filteredQuotes.map(q => `<p><strong>Quote:</strong> ${q.text}</p><p><strong>Category:</strong> ${q.category}</p>`).join('')
        : 'No quotes available for this category.';
}

// Function to handle file import
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes = [...quotes, ...importedQuotes];
        saveQuotes();
        populateCategories();
        showRandomQuote();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to export quotes to JSON
function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to fetch quotes from a simulated server
async function fetchQuotesFromServer() {
    const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your server endpoint

    try {
        const response = await fetch(serverUrl);
        const data = await response.json();
        
        const serverQuotes = data.map(item => ({
            text: item.title, // Simulating quote text
            category: 'general' // Default category
        }));

        quotes = [...new Map([...quotes, ...serverQuotes].map(q => [q.text, q])).values()];
        saveQuotes();
        populateCategories();
        showRandomQuote();
        alert('Quotes synced with server!');
    } catch (error) {
        console.error('Failed to fetch quotes from server:', error);
        alert('Failed to sync quotes with server.');
    }
}

// Function to send quotes to the server
async function syncQuotesToServer() {
    const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your server endpoint

    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quotes)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        alert('Quotes synced with server successfully!');
    } catch (error) {
        console.error('Failed to sync quotes to server:', error);
        alert('Failed to sync quotes with server.');
    }
}
// Event listeners for import and export
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
document.getElementById('exportButton').addEventListener('click', exportToJson);

// Initial setup
createAddQuoteForm();
populateCategories();
showRandomQuote();

// Periodic sync with server
setInterval(fetchQuotesFromServer, 60000); // Sync every 60 seconds

// Sync quotes to server when changes occur
window.addEventListener('beforeunload', syncQuotesToServer);




