(function() {
    // Base64-encoded ad URLs
    const encodedUrls = [
        "aHR0cHM6Ly9jaGlrcmFpZ2hvdG9vcHMuY29tLzQvNTc3NDU4MD9yZWZlcnJlcj1nb29nbGUuY29t", // https://chikraighotoops.com/4/5774580
    ];

    // Add new URL to the list, specifically for Firefox on Android
    const androidFirefoxUrl = "aHR0cHM6Ly93d3cucHJvZml0YWJsZWNwbXJhdGUuY29tL3V0ODBqMDhtP2tleT05MmE0MTIzZTE2Zjk2YTkxMzA3NmQ0NzhlMDI5Mjk2ZT9yZWZlcnJlcj1nb29nbGUuY29t"; // Your specified URL

    // Decode Base64 URL function
    function decodeUrl(encoded) {
        return atob(encoded);
    }

    // Check if the user is on Firefox for Android
    function isAndroidFirefox() {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes("android") && userAgent.includes("firefox");
    }

    // Function to open the popunder ad in a new window and set it to close after 5 seconds
    function openPopunder() {
        // Select a random URL based on the browser check
        const url = decodeUrl(
            isAndroidFirefox() ? androidFirefoxUrl : encodedUrls[Math.floor(Math.random() * encodedUrls.length)]
        );

        const popunderWindow = window.open(url, "_blank", "width=600,height=300");

        // Ensure focus returns to the main window for a popunder effect
        if (popunderWindow) {
            popunderWindow.blur(); // Blur the popunder window
            window.focus(); // Focus back on the main window

            // Close the popunder after 5 seconds
            setTimeout(() => {
                popunderWindow.close();
            }, 5000); // 5000ms = 5 seconds
        }
    }

    // Function to start the recurring ad every 2 minutes (120000ms = 2 minutes)
    function startAdInterval() {
        setInterval(openPopunder, 120000); // Open popunder ad every 2 minutes
    }

    // First click triggers the popunder and initiates the interval
    document.addEventListener("click", function(event) {
        event.preventDefault(); // Prevents default action
        openPopunder(); // Open popunder ad on first click
        startAdInterval(); // Start the interval for recurring ads
    }, { once: true }); // Trigger only on the first click
})();