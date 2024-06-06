import React from 'react';
import ImageAnalysisComponent from './components/ImageAnalysisComponent';
import ScheduleAppointmentComponent from './components/ScheduleAppointmentComponent';

function App() {
    return (
        <div className="App">
            <h1>Analyze Tattoo Images and Schedule Appointments</h1>
            <ImageAnalysisComponent />
            <ScheduleAppointmentComponent />
        </div>
    );
}

export default App;
