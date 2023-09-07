import React, { useState, useEffect } from 'react';
import sendNotification from './notification';
import deleteNotification from './deleteNotification';

function App() {
  const [address, setAddress] = useState('');
  const [webhookData, setWebhookData] = useState([]);
  const [notificationResponse, setNotificationResponse] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendNotification(address)
    .then(data => {
      const responseId = data.id;
      setNotificationResponse(responseId);
      console.log(responseId)
    })
    .catch(error => console.log('error', error));
  };
  
  const handleStop = () => {
    if (notificationResponse) {
      deleteNotification(notificationResponse)
    } else {
      console.error('Notification response is undefined');
    }
    setLoading(false);
    setIsSending(false);
  };

  const fetchWebhookData = async () => {
    try {
      const response = await fetch('http://localhost:4001/webhook-data');
      const data = await response.json();
      const newTransactionHash = 'https://etherscan.io/tx/' + data[0].transactionHash;
      setWebhookData(prevWebhookData => {
        if (!prevWebhookData.includes(newTransactionHash)) {
          return [...prevWebhookData, newTransactionHash];
        } else {
          return prevWebhookData;
        }
      });   
    } catch (error) {
        console.error('Error fetching webhook data:', error);
    }
  };

  useEffect(() => {
    if (notificationResponse) {
      setIsSending(true);
    }
  }, [notificationResponse]);

  useEffect(() => {
    const interval = setInterval(fetchWebhookData, 5000); // Fetch the webhook data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen justify-center space-x-3 overflow-x-auto overflow-y-auto">  
      <div className="flex justify-center space-x-3 w-screen h-14 mt-10">
        <form 
            onSubmit={handleSubmit}
            className="flex flex-row gap-1"> 
            <button
              type='button'
              className="btn ghost danger"
              disabled={!isSending}
              onClick={handleStop}
            >
              Stop
            </button>
            <input
                onChange={e => setAddress(e.target.value)}
                type="text"
                placeholder="Contract Address 📇"
                className = "input success"
                disabled={loading}
            />
            <button
              type='submit'
              className="btn ghost success"
              disabled={loading}
            >
            GO
            </button>
        </form>
      </div>
      {isSending && (
          <a 
              href={`https://dashboard.quicknode.com/quick-alerts/${notificationResponse}`} 
              className='link text-success-800'
              target="_blank" 
              rel="noopener noreferrer"
          >
              👀 QuickAlerts Dash
          </a>
      )}
      <div className="relative top-4/12 left-1/4 justify-center w-6/12 h-140 m-10">
        {webhookData && webhookData.map((transactionHash, index) => (
          <div key={index} className='mt-2 mb-0 overflow-visible'>
            <a href={transactionHash} 
              target="_blank" 
              rel="noopener noreferrer"
              className='link text-success-800'
            >{transactionHash}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
