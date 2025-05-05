import React from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';


// Setup localizer
const localizer = momentLocalizer(moment);

// Define allowed views
const allViews: View[] = ['month', 'week', 'work_week', 'day', 'agenda'];

const CalendarView: React.FC = () => {
  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={events}
        step={60}
        views={allViews}
        defaultView="month"
        defaultDate={new Date(2015, 3, 1)}
        popup={false}
        onShowMore={(events, date) => {
          console.log('Show more clicked', events, date);
        }}
      />
    </div>
  );
};

export default CalendarView;
