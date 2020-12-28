import {React} from 'react'
import Countdown from '../components/Countdown';
import NotButton from '../components/NotButton';
import Activities from '../components/Activities';

function HomePage(props) {

    if(props.logged == 'true'){
      return (
        <div className='everything'>
            <Countdown vrijeme = {props.vrijeme} />
            <Activities activities = {props.activity} />
        </div>
        );
    }
    return (
        <div className='everything'>
            <NotButton />
            <Countdown vrijeme = {props.vrijeme} />
            <Activities activities = {props.activity} />
        </div>
    );
  }
    
    export default HomePage;