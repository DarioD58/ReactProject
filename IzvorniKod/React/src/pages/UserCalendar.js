import React from 'react'
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import moment from 'moment'
import events from '../testingData/events'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

let allViews = Object.keys(Views).map(k => Views[k])

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

function UserCalendar(){

    return (
        <div className='everything'>
          <div className='calendar-wrapper'>
            <Calendar 
                events={events}
                views={allViews}
                defaultDate={new Date(2021, 1, 1)}
                components={{
                    timeSlotWrapper: ColoredDateCellWrapper
                  }}
                localizer={localizer}
            />
          </div>
        </div>
    );
}

export default UserCalendar;