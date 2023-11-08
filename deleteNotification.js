const API_KEY = 'QuickAlerts_API_Key_Here'; // QuickAlerts API Key

async function deleteNotification(notificationResponse) {

    try {
        const myHeaders = new Headers();
        myHeaders.append('accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('x-api-key', API_KEY);

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        }
        const response = await fetch(`https://api.quicknode.com/quickalerts/rest/v1/notifications/${encodeURIComponent(notificationResponse)}`, requestOptions);
        return response
    } catch(error) {
            console.log('error', error);
    }
}

export default deleteNotification;
