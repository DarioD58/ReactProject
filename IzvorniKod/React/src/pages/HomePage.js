import {React} from 'react'
import Countdown from '../components/Countdown';
import NotButton from '../components/NotButton';
import Activities from '../components/Activities';

function HomePage(props) {

    if(props.logged == 'true'){
      return (
        <div className='everything'>
            <Countdown vrijeme = {props.vrijeme} />
        </div>
        );
    }
    return (
        <div className='everything'>
            <NotButton />
            <div>
              <h2 className='text-center general-text'>{props.ime}</h2>
              <p className='text-center general-text'>Najbolji kamp počinje</p>
              <hr className='general-text'/>
              <p className='text-center general-text'>{props.vrijeme}</p>
            </div>
            <Activities activities = {props.activity} />
        </div>
    );
  }
    
    export default HomePage;