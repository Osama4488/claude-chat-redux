import { useEffect, useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('https://localhost:7001/api/Home/hello');
        if (response.ok) {
          const data = await response.text();
          setMessage(data);
        } else {
          console.error('Failed to fetch message:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Message from .NET Core API:</h1>
      <p>{message}</p>
    </div>
  );
}
