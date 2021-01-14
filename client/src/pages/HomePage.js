import {React} from 'react'
import Countdown from '../components/Countdown';
import NotButton from '../components/NotButton';
import Activities from '../components/Activities';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

function HomePage(props) {
   if(props.ime == undefined){
      return (<div className='everything'>
        <div className='second-section'>
          <h2 className='text-center general-text'>Nažalost nema još najavljenih kampova.</h2>
        </div>
      </div>)
    } else if(props.logged === "false" && (props.aktivne_prijave_sud === "1" || props.aktivne_prijave_anim === "1")){
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
    } else if(props.logged === "false"){
      return (
        <div className='everything'>
            <div className='first-section'>
              <h3 className='text-center general-text'>Trenutno nisu aktivne prijave za kamp!</h3>
            </div>
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
    }else if(props.logged === 'true' && props.status === 0 && props.pocetak_prijava_sud !== undefined){
      return (
        <div className='everything'>
            <Countdown vrijeme = {props.vrijeme} />
        </div>
        );
    } else if(props.logged === 'true' &&  Cookies.getJSON('korisnik').statusKorisnik === 'organizator'){
      return (
        <div className='everything'>
            <Redirect to='/viewgrades' />
        </div>
        );
    } else if(props.logged === 'true' && props.status === 0 && props.pocetak_prijava_sud === undefined){
      return (
        <div className='everything'>
            <Redirect to='/overallexperience' />
        </div>
        );
    } else if(props.logged === 'true' && props.status === 1){
      return (
        <div className='everything'>
            <Redirect to='/calendar' />
        </div>
        );
    } else {  
    return (
      <div className='everything'>
        <h1 className='text-center general-text'>Ooops something went wrong</h1>
      </div>
    )
  }
}
    
    export default HomePage;