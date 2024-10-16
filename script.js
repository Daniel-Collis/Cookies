// Function to fetch the access token
async function fetchAccessToken() {
    const clientId = 'AZYUIsy3VGrpykZaJqlxDill8FREbKR7cJT-SvvjUDdeAAJEzCGpE0MF1tlD_p7wbG5IJDyx7oxqMhrc'; // Replace with your client ID
    const secret = 'EKG8ln5xsgRgnIWEaT8fMUGDwezSMMNKHZOa1abIp-nhyrnyri6ppv1oCiQGjrw9xxgQs6ffCwWzEvJ5'; // Replace with your secret key

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
                    'plan_id': 'P-67323783YY2340433M4HD2JA' // Replace with your actual PayPal Plan ID for Plan 1
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
                    'plan_id': 'P-9PY4033347908330WM4HD3IY' // Replace with your actual PayPal Plan ID for Plan 2
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
                    'plan_id': 'P-2NB85826R4275503FM4HD46A' // Replace with your actual PayPal Plan ID for Plan 3
                });
            },
            onApprove: function(data, actions) {
                   // Redirect to confirmation page with subscription ID and plan name
    const planName = 'Deluxe Plan'; // Change based on the plan chosen
    window.location.href = `confirmation.html?subscriptionID=${data.subscriptionID}&planName=${encodeURIComponent(planName)}`;
            },
            onError: function(err) {
                console.error('Error occurred during subscription:', err);
                alert('An error occurred. Please try again. Error details: ' + JSON.stringify(err));
            }
        }).render('#paypal-button-container-plan3'); // Render PayPal button in the div for Plan 3

    } catch (error) {
        console.error('Error creating Paypal buttons:', error);
    }
}

// Call the function to create Paypal buttons
createPaypalButtons();
