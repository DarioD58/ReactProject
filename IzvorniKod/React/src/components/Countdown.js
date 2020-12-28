import React, { useEffect, useRef, useState} from 'react';


function Countdown(props) {

    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = async () => {
        const countdownDate = new Date(props.vrijeme).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                //stop times
                clearInterval(interval.current);
            } else {
                if(!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)){
                    setTimerDays(days);
                    setTimerHours(hours);
                    setTimerMinutes(minutes);
                    setTimerSeconds(seconds);
                }
            }
        }, 1000);
    };

    useEffect(async () => {
        await startTimer();
        return () => {
            clearInterval(interval.current);
        };
    });

    return (
        <section className="timer-container">
            <section className="timer">
                <div>
                    <span className="mdi mdi-calendar-clock"></span>
                    <h2 className="general-text">Odbrojavanje do početka kampa!</h2>
                </div>
                <div className="countdown-font-color">
                    <section>
                        <p>{timerDays}</p>
                        <p><small>Dana</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerHours}</p>
                        <p><small>Sati</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerMinutes}</p>
                        <p><small>Minuta</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerSeconds}</p>
                        <p><small>Sekundi</small></p>
                    </section>
                </div>
            </section>
        </section>
    );
}
export default Countdown;