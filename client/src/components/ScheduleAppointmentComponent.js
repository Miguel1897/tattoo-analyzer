import React, { useState } from 'react';

const ScheduleAppointmentComponent = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSchedule = async () => {
        try {
            const response = await fetch('/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, time }),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(`Appointment scheduled: ${result.htmlLink}`);
            } else {
                setMessage('Error scheduling appointment.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error scheduling appointment.');
        }
    };

    return (
        <div>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <button onClick={handleSchedule}>Schedule Appointment</button>
            {message && <div>{message}</div>}
        </div>
    );
};

export default ScheduleAppointmentComponent;
