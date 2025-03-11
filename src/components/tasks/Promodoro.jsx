import React, { useState, useEffect, useRef } from 'react';
import audioFile from '../../assets/audio.wav';
import '../tasks/Promodoro.css'; // Import the CSS file

function PomodoroTimer() {
  // State for the timer
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default: 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true); // Tracks if it's work or break time

  // State for customizable durations
  const [workDuration, setWorkDuration] = useState(() => {
    const savedWorkDuration = localStorage.getItem('workDuration');
    return savedWorkDuration ? parseInt(savedWorkDuration, 10) : 25;
  });
  const [breakDuration, setBreakDuration] = useState(() => {
    const savedBreakDuration = localStorage.getItem('breakDuration');
    return savedBreakDuration ? parseInt(savedBreakDuration, 10) : 5;
  });

  // State for tracking completed rounds
  const [roundsCompleted, setRoundsCompleted] = useState(0);

  // Ref for the audio element
  const audioRef = useRef(null);

  // Calculate progress for the progress bar
  const totalTime = isWorkTime ? workDuration * 60 : breakDuration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Play sound and update rounds when the timer switches
  useEffect(() => {
    if (timeLeft === 0) {
      if (audioRef.current) {
        audioRef.current.play(); // Play the sound
      }

      // Increment rounds completed when switching from break to work
      if (!isWorkTime) {
        setRoundsCompleted((prevRounds) => prevRounds + 1);
      }

      // Switch between work and break time
      if (isWorkTime) {
        setTimeLeft(breakDuration * 60); // Switch to break time
        setIsWorkTime(false);
      } else {
        setTimeLeft(workDuration * 60); // Switch to work time
        setIsWorkTime(true);
      }
    }
  }, [timeLeft, isWorkTime, workDuration, breakDuration]);

  // Save durations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('workDuration', workDuration.toString());
  }, [workDuration]);

  useEffect(() => {
    localStorage.setItem('breakDuration', breakDuration.toString());
  }, [breakDuration]);

  // useEffect to handle the countdown
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Cleanup interval
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

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
    setRoundsCompleted(0); // Reset rounds completed
  };

  // Handle changes to work duration input
  const handleWorkDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setWorkDuration(value);
      if (!isActive && isWorkTime) {
        setTimeLeft(value * 60); // Update timeLeft if not active
      }
    }
  };

  // Handle changes to break duration input
  const handleBreakDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setBreakDuration(value);
      if (!isActive && !isWorkTime) {
        setTimeLeft(value * 60); // Update timeLeft if not active
      }
    }
  };

  return (
    <div className="pomodoro-container">
      <h1 className="pomodoro-title">Pomodoro Timer</h1>
      <h2 className={`pomodoro-mode ${isWorkTime ? 'work-mode' : 'break-mode'}`}>
        {isWorkTime ? 'Work Time' : 'Break Time'}
      </h2>
      <h3 className="pomodoro-timer">{formatTime(timeLeft)}</h3>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%`, backgroundColor: isWorkTime ? '#4caf50' : '#ff9800' }}
        />
      </div>

      {/* Rounds Completed */}
      <p className="rounds-completed">Rounds Completed: {roundsCompleted}</p>

      {/* Buttons */}
      <div className="button-container">
        <button className="control-button" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="control-button reset-button" onClick={resetTimer}>
          Reset
        </button>
      </div>

      {/* Duration Inputs */}
      <div className="duration-container">
        <label className="duration-label">
          Work Duration (minutes):
          <input
            type="number"
            value={workDuration}
            onChange={handleWorkDurationChange}
            min="1"
            disabled={isActive}
            className="duration-input"
          />
        </label>
        <label className="duration-label">
          Break Duration (minutes):
          <input
            type="number"
            value={breakDuration}
            onChange={handleBreakDurationChange}
            min="1"
            disabled={isActive}
            className="duration-input"
          />
        </label>
      </div>

      {/* Audio element for sound alerts */}
      <audio ref={audioRef} src={audioFile} preload="auto" />
    </div>
  );
}

export default PomodoroTimer;