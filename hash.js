function hashArabicString(arabicString) {
    // Initialize hash value
    let hashValue = 0;
    // Define a prime number for the hash function
    const prime = 31;
    
    for (let i = 0; i < arabicString.length; i++) {
        // Update the hash value
        hashValue = hashValue * prime + arabicString.charCodeAt(i);
        // Ensure the hash value does not become too large (optional)
        hashValue = hashValue & 0xFFFFFFFF;
    }
    
    // Use unsigned right shift to ensure non-negative integer
    return hashValue >>> 0;
}

// Example usage
const arabicWordWithDiacritics = "أَعْمَلُ";
console.log(`The hash for '${arabicWordWithDiacritics}' is ${hashArabicString(arabicWordWithDiacritics)}`);
