// Wait for the page to load
window.onload = function() {
    // Get the elements we need
    var textInput = document.getElementById('text-input');
    var charCount = document.getElementById('char-count');
    var wordCount = document.getElementById('word-count');
    var charBox = document.getElementById('char-box');
    var wordBox = document.getElementById('word-box');
    var clearBtn = document.getElementById('clear-btn');
    
    // Auto-focus the textarea when page loads
    textInput.focus();
    
    // Store previous values for comparison
    var prevCharCount = 0;
    var prevWordCount = 0;
    
    // Function to create odometer-like animation
    function createOdometerAnimation(element, newValue, prevValue) {
        if (newValue === prevValue) return;
        
        // For simplicity, just update the text directly for now
        // We'll implement a more complex animation later if needed
        element.textContent = newValue;
        
        // Add a simple animation class
        element.classList.remove('number-change');
        void element.offsetWidth; // Force reflow
        element.classList.add('number-change');
    }
    
    // Function to count characters and words
    function countText() {
        // Get the text from the textarea
        var text = textInput.value;
        
        // Count characters (including spaces)
        var characters = text.length;
        
        // Count words
        // First trim whitespace from beginning and end
        var trimmedText = text.trim();
        
        // If the text is empty, word count is 0
        var words = 0;
        if (trimmedText !== '') {
            // Split by spaces and count the resulting array length
            words = trimmedText.split(/\s+/).length;
        }
        
        // Animate the number changes
        createOdometerAnimation(charCount, characters, prevCharCount);
        createOdometerAnimation(wordCount, words, prevWordCount);
        
        // Store current values for next comparison
        prevCharCount = characters;
        prevWordCount = words;
        
        // Add animation to the counter boxes
        addPulseAnimation(charBox);
        addPulseAnimation(wordBox);
    }
    
    // Function to clear the textarea
    function clearText() {
        textInput.value = '';
        countText();
        textInput.focus(); // Focus back on textarea after clearing
    }
    
    // Add event listener to update counts when user types
    textInput.addEventListener('input', countText);
    
    // Also update when user pastes text
    textInput.addEventListener('paste', countText);
    
    // Add event listener for the clear button
    clearBtn.addEventListener('click', clearText);
}; 