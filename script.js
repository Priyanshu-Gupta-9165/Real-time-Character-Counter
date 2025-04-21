// Wait for the page to load
window.onload = function() {
    // Get the elements we need
    var textInput = document.getElementById('text-input');
    var charCount = document.getElementById('char-count');
    var wordCount = document.getElementById('word-count');
    
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
        if (trimmedText === '') {
            wordCount.textContent = '0';
        } else {
            // Split by spaces and count the resulting array length
            var words = trimmedText.split(/\s+/);
            wordCount.textContent = words.length;
        }
        
        // Update the character count
        charCount.textContent = characters;
    }
    
    // Add event listener to update counts when user types
    textInput.addEventListener('input', countText);
    
    // Also update when user pastes text
    textInput.addEventListener('paste', countText);
}; 