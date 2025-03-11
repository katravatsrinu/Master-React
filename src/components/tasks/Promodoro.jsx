import React, { useState, useEffect, useRef } from 'react';
import audioFile from '../../assets/audio.wav'
function PomodoroTimer() {
  // State for the timer
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default: 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true); // Tracks if it's work or break time

  // State for customizable durations
  const [workDuration, setWorkDuration] = useState(()=>{
    const savedWorkDuration = localStorage.getItem('workDuration');
    return savedWorkDuration ? parseInt(savedWorkDuration,10) : 25;
  })
  const [breakDuration, setBreakDuration] = useState(()=>{
    const savedBreakDuration = localStorage.getItem('breakDuration');
    return savedBreakDuration ? parseInt(savedBreakDuration,10) : 5;
  })

  const audioRef = useRef(null);

  useEffect(()=>{
    if(timeLeft===0){
      if(audioRef.current){
        audioRef.current.play();
      }
    }
  },[timeLeft])


  useEffect(()=>{
    localStorage.setItem('workDuration',workDuration.toString());
  },[workDuration])

  useEffect(()=>{
    localStorage.setItem('breakDuration',breakDuration.toString());
  },[breakDuration])

  // useEffect to handle the countdown
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Switch between work and break time
      if (isWorkTime) {
        setTimeLeft(breakDuration * 60); // Switch to break time
        setIsWorkTime(false);
      } else {
        setTimeLeft(workDuration * 60); // Switch to work time
        setIsWorkTime(true);
      }
    }

    // Cleanup interval
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorkTime, workDuration, breakDuration]);

  // Format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Start/Pause the timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(workDuration * 60); // Reset to work duration
    setIsWorkTime(true);
  };

  // Handle changes to work duration input
  const handleWorkDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setWorkDuration(value);
      if (!isActive && isWorkTime) {
        setTimeLeft(value * 60); // Update timeLeft if not active
      }
    }
  };

  // Handle changes to break duration input
  const handleBreakDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setBreakDuration(value);
      if (!isActive && !isWorkTime) {
        setTimeLeft(value * 60); // Update timeLeft if not active
      }
    }
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <h2>{isWorkTime ? 'Work Time' : 'Break Time'}</h2>
      <h3>{formatTime(timeLeft)}</h3>
      <button onClick={toggleTimer}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={resetTimer}>Reset</button>
      <audio ref={audioRef} src={audioFile} preload='auto' />
      <div>
        <label>
          Work Duration (minutes):
          <input
            type="number"
            value={workDuration}
            onChange={handleWorkDurationChange}
            min="1"
            disabled={isActive} // Disable input while timer is active
          />
        </label>
      </div>
      <div>
        <label>
          Break Duration (minutes):
          <input
            type="number"
            value={breakDuration}
            onChange={handleBreakDurationChange}
            min="1"
            disabled={isActive} // Disable input while timer is active
          />
        </label>
      </div>
    </div>
  );
}

export default PomodoroTimer;