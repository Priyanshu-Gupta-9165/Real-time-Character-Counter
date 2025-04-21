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
        
        // For small numbers, just update the text directly
        if (newValue < 10) {
            element.textContent = newValue;
            return;
        }
        
        // Convert numbers to strings and pad with zeros if needed
        var oldStr = prevValue.toString();
        var newStr = newValue.toString();
        
        // Make sure both strings have the same length
        while (oldStr.length < newStr.length) {
            oldStr = '0' + oldStr;
        }
        while (newStr.length < oldStr.length) {
            newStr = '0' + newStr;
        }
        
        // Clear the element
        element.innerHTML = '';
        
        // Create odometer digits for each position
        for (var i = 0; i < newStr.length; i++) {
            var digitContainer = document.createElement('div');
            digitContainer.className = 'odometer-digit';
            
            var digitsWrapper = document.createElement('div');
            digitsWrapper.className = 'odometer-digits';
            
            // Calculate how many steps to move
            var oldDigit = parseInt(oldStr[i]);
            var newDigit = parseInt(newStr[i]);
            var steps = (newDigit - oldDigit + 10) % 10;
            
            // Create the digit elements
            for (var j = 0; j < 10; j++) {
                var digitElement = document.createElement('div');
                digitElement.className = 'odometer-digit-inner';
                digitElement.textContent = j;
                digitsWrapper.appendChild(digitElement);
            }
            
            // Set the initial position
            digitsWrapper.style.transform = 'translateY(' + (-oldDigit * 50) + 'px)';
            
            // Add to the container
            digitContainer.appendChild(digitsWrapper);
            element.appendChild(digitContainer);
            
            // Animate to the new position after a small delay
            setTimeout(function(wrapper, steps, oldDigit) {
                wrapper.style.transform = 'translateY(' + (-((oldDigit + steps) % 10) * 50) + 'px)';
            }, 50 * i, digitsWrapper, steps, oldDigit);
        }
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