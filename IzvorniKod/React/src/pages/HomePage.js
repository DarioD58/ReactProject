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
            <NotButton cssClass={'first-section'}/>
            <div className='second-section'>
              <h2 className='text-center general-text'>{props.ime}</h2>
              <p className='text-center general-text'>Najbolji kamp počinje</p>
              <hr className='general-text'/>
              <p className='text-center general-text'>{props.vrijeme}</p>
              <h4 className='text-center general-text'>Prijave za kamp</h4>
              <div className='grid-container'>
                <p id='grid-title1' className='text-center general-text'>SUDIONICI</p>
                <p id='grid-title2' className='text-center general-text'>ANIMATORI</p>
                <p className='text-center general-text'>Početak prijava za kamp:</p>
                <p className='text-center general-text'>{props.pocetak_prijava_sud}</p>
                <p className='text-center general-text'>{props.pocetak_prijava_anim}</p>
                <p className='text-center general-text'>Kraj prijava za kamp:</p>
                <p className='text-center general-text'>{props.kraj_prijava_sud}</p>
                <p className='text-center general-text'>{props.kraj_prijava_anim}</p>
              </div>
            </div>
            <Activities activities = {props.activity} cssClass={'first-section'} />
        </div>
    );
  }
    
    export default HomePage;