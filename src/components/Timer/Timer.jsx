import React, { Component } from 'react';
import { timer } from 'rxjs';

import TimerField from '../TimerField/TimerField';
import Button from '../Button/Button';

import styles from './Timer.module.scss';
import buttonStyles from '../Button/Button.module.scss';

export default class Timer extends Component {
  mainTimer = timer(0, 1000);
  currentTimer = null;
  
  state = {
    timerValue: 0,
    waitValue: 0,
    isStarted: false,
    hours: "00",
    mins: "00",
    secs: "00",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timerValue !== this.state.timerValue) {
      const currentTime = this.calculateTime(this.state.timerValue);
      this.setDateInState(currentTime);
    };
  };

  handleStartTimer = () => {
    if (this.state.waitValue !== 0) {
      return this.currentTimer = this.mainTimer.subscribe(res => this.setState({
        timerValue: res + this.state.waitValue,
        isStarted: true,
      }));
    } else {
      return this.currentTimer = this.mainTimer.subscribe(res => this.setState({
        timerValue: res,
        isStarted: true,
      }));
    };
  };

  handleStopTimer = () => {
    this.setState({
      isStarted: false,
      waitValue: 0,
    });
    this.resetDate();

    return this.currentTimer.unsubscribe();
  };

  handleWaitTimer = () => {
    if (this.currentTimer === null) {
      return;
    };
    this.setState({
      isStarted: false,
      waitValue: this.state.timerValue,
    })

    return this.currentTimer.unsubscribe();
  }

  handleResetTimer = () => {
    if (this.currentTimer === null) {
      return;
    };

    this.handleStopTimer();
    this.handleStartTimer();
  }

  calculateTime = (time) => {
    const hours = this.pad(Math.floor((time / (60 * 60))));
    const mins = this.pad(Math.floor(time % (60 * 60) / 60));
    const secs = this.pad(Math.floor((time % 60)));
    const calculatedTime = {
      hours,
      mins,
      secs,
    };

    return calculatedTime;
  };

  setDateInState = ({hours, mins, secs}) => {
    this.setState({
      hours,
      mins, 
      secs,
    });
  };

  resetDate = () => {
    this.setState({
      hours: "00",
      mins: "00",
      secs: "00",
    });
  };

  pad = (value) => {
    return String(value).padStart(2, '0');
  };

  render() {
    const {isStarted, hours, mins, secs } = this.state;
    return (
      <>
        <div className={styles.timer}>

          <TimerField value={hours} label={"Hours"}/>
          <TimerField value={mins} label={"Minutes"}/>
          <TimerField value={secs} label={"Seconds"}/>

        </div>

        <div className={styles.buttonsWrap}>
          
          { !isStarted ? 
            <Button onClickFunc={this.handleStartTimer} holderText={"Start"} nameOfClass={buttonStyles.startButton}/> 
            : 
            <Button onClickFunc={this.handleStopTimer} holderText={"Stop"} nameOfClass={buttonStyles.stopButton}/>
          }

          { isStarted ? 
            <Button onDblClickFunc={this.handleWaitTimer} holderText={"Wait"} nameOfClass={buttonStyles.waitButton}/> 
            : 
            <Button onDblClickFunc={this.handleWaitTimer} holderText={"Wait"} nameOfClass={buttonStyles.waitButton} isDisabled={true}/>
          }
          { isStarted ? 
            <Button onClickFunc={this.handleResetTimer} holderText={"Reset"} nameOfClass={buttonStyles.resetButton} /> 
            : 
            <Button onClickFunc={this.handleResetTimer} holderText={"Reset"} nameOfClass={buttonStyles.resetButton} isDisabled={true}/>
          }
        </div>
      </>
    );
  };
};