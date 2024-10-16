// Function to fetch the access token
async function fetchAccessToken() {
    const clientId = 'AXrhqnjtuNOQuHLkLjy6ypNaGyYMHBGTbXUZizzfGLPva5x2ZqiD1K2bKADTYPYJ9ZcnU7oMJ4rB-Sjk'; // Replace with your client ID
    const secret = 'EDM_IjFC19Ms8BZK427xPGTI4S_pBCvyWm4k7vwqgrBP_0DIA0o4rFn8UrtXwtENL2UEhUp9G5jJYyyI'; // Replace with your secret key

    const response = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    if (response.ok) {
        return data.access_token; // Return the access token
    } else {
        console.error('Error fetching access token:', data);
        throw new Error('Failed to fetch access token');
    }
}

// Function to create PayPal buttons
async function createPaypalButtons() {
    try {
        const accessToken = await fetchAccessToken(); // Get the access token

        // PayPal Button for Plan 1
        paypal.Buttons({
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                    'plan_id': 'P-1NK39223H40246609M4HZNPQ' // Replace with your actual PayPal Plan ID for Plan 1
                });
            },
            onApprove: function(data, actions) {
                   // Redirect to confirmation page with subscription ID and plan name
    const planName = 'Basic Plan'; // Change based on the plan chosen
    window.location.href = `confirmation.html?subscriptionID=${data.subscriptionID}&planName=${encodeURIComponent(planName)}`;
            },
            onError: function(err) {
                console.error('Error occurred during subscription:', err);
                alert('An error occurred. Please try again. Error details: ' + JSON.stringify(err));
            }
        }).render('#paypal-button-container-plan1'); // Render PayPal button in the div for Plan 1

        // PayPal Button for Plan 2
        paypal.Buttons({
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                    'plan_id': 'P-1RS381855U508163LM4HZPMQ' // Replace with your actual PayPal Plan ID for Plan 2
                });
            },
            onApprove: function(data, actions) {
                   // Redirect to confirmation page with subscription ID and plan name
    const planName = 'Standard Plan'; // Change based on the plan chosen
    window.location.href = `confirmation.html?subscriptionID=${data.subscriptionID}&planName=${encodeURIComponent(planName)}`;
            },
            onError: function(err) {
                console.error('Error occurred during subscription:', err);
                alert('An error occurred. Please try again. Error details: ' + JSON.stringify(err));
            }
        }).render('#paypal-button-container-plan2'); // Render PayPal button in the div for Plan 2

        // PayPal Button for Plan 3
        paypal.Buttons({
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                    'plan_id': 'P-1G994000C5930145BM4HZQBI' // Replace with your actual PayPal Plan ID for Plan 3
                });
            },
            onApprove: function(data, actions) {
                    // Redirect to confirmation page with subscription ID and plan name
    const planName = 'Deluxe Plan'; // Change based on the plan chosen
    window.location.href = `confirmation.html?subscriptionID=${data.subscriptio