import React from 'react';
import { useHistory } from "react-router-dom";
import Activity from './Activity';

function Activities(props){
    const activities = Array.from(props.activities);

    if(activities === undefined){
        return (
            <div className={props.cssClass}>
                <div className="general-text text-center activity-header">AKTIVNOSTI KAMPA</div>
                <div className="activites text-light">
                    <div className='aktivnosti'>
                        <h3>Naziv</h3>
                        <h3>Opis</h3>
                        <h3>Trajanje</h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={props.cssClass}>
            <div className="general-text text-center activity-header">AKTIVNOSTI KAMPA</div>
            <div className="activites text-light">
                <div className='aktivnosti'>
                    <h3>Naziv</h3>
                    <h3>Opis</h3>
                    <h3>Trajanje</h3>
                </div>
                {activities.map((activity) => <Activity key={activity.ime_aktivnosti} activity={activity}/>)}
            </div>
        </div>
    );

}
export default Activities;