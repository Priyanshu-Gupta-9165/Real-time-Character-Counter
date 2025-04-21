document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');

    function updateCount() {
        const text = textInput.value;
        
        // Update character count
        charCount.textContent = text.length;
        
        // Update word count
        const words = text.trim().split(/\s+/);
        wordCount.textContent = text.trim() === '' ? 0 : words.length;
    }

    // Add event listeners for real-time updates
    textInput.addEventListener('input', updateCount);
    textInput.addEventListener('paste', updateCount);
}); 