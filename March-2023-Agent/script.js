document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const responseDiv = document.getElementById('response');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally
        const userInput = document.getElementById('userInput').value;

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            responseDiv.textContent = data.message; // Display the response message
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            responseDiv.textContent = 'An error occurred. Please try again.'; // Provide feedback to the user
        }
    });
});
