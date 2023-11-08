import fetchDestinationId from './destination';
const API_KEY = 'QuickAlerts_API_Key_Here'; // QuickAlerts API Key

async function sendNotification(address) {
    const encodedExpression = btoa(`(tx_logs_address == '${address}' && tx_logs_topic0 == '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67')`);
    try {
        const destinationId = await fetchDestinationId();
        const myHeaders = new Headers();
        myHeaders.append('accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('x-api-key', API_KEY);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            maxBodyLength: Infinity,
            body: JSON.stringify({
                name: "Uniswap V3 Swaps",
                expression: encodedExpression,
                network: "ethereum-mainnet",
                destinationIds: [destinationId]
            }),
        };

        const response = await fetch('https://api.quicknode.com/quickalerts/rest/v1/notifications', requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('error', error);
    }
}

export default sendNotification;
