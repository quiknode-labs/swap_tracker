const API_KEY = 'QuickALerts_API_Key_Here'; // QuickAlerts API Key

async function fetchDestinationId() {
    try {
        const myHeaders = new Headers();
        myHeaders.append('accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('x-api-key', API_KEY);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({
                name: 'Swap Destination',
                to_url: 'ngrok_URL_Here/webhook', // Add ngrok URL here
                webhook_type: 'POST',
                service: 'webhook',
                payload_type: 5,
            }),
        };

        const response = await fetch('https://api.quicknode.com/quickalerts/rest/v1/destinations', requestOptions);
        const result = await response.json();
        const destinationId = result.id;
        return destinationId;
    } catch (error) {
        console.log('error', error);
    }
}

export default fetchDestinationId;
