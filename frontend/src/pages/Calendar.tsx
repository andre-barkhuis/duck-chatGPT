import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogType, Stack } from '@fluentui/react';

const localizer = momentLocalizer(moment);
const allViews: View[] = ['month', 'week', 'work_week', 'day', 'agenda'];

// Type for events fetched from the backend
interface CalendarTaskEvent {
  user_id: string;
  conversation_id: string;
  description: string;
  event_date: string; // ISO string
  source_message_id?: string;
  created_at?: string;
}

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<CalendarTaskEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarTaskEvent | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/calendar/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError('Could not load calendar events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Map backend events to react-big-calendar format
  const calendarEvents = useMemo(() =>
    events.map(ev => ({
      title: ev.description,
      start: new Date(ev.event_date),
      end: new Date(ev.event_date),
      allDay: true,
      ...ev
    })),
    [events]
  );

  return (
    <div style={{ height: 700 }}>
      {loading && <div>Loading calendar events...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        step={60}
        views={allViews}
        defaultView="month"
        defaultDate={new Date()}
        onSelectEvent={event => setSelectedEvent(event as CalendarTaskEvent)}
        popup
      />
      <Dialog
        hidden={!selectedEvent}
        onDismiss={() => setSelectedEvent(null)}
        dialogContentProps={{
          type: DialogType.normal,
          title: selectedEvent?.description || 'Task/Event',
          subText: selectedEvent ? `Date: ${selectedEvent.event_date}` : ''
        }}
        modalProps={{
          isBlocking: false
        }}
      >
        <Stack>
          {selectedEvent && (
            <div style={{ marginBottom: 12 }}>
              <b>Description:</b> {selectedEvent.description}<br />
              <b>Date:</b> {selectedEvent.event_date}<br />
              {selectedEvent.conversation_id && (
                <><b>Conversation ID:</b> {selectedEvent.conversation_id}<br /></>
              )}
              {selectedEvent.source_message_id && (
                <><b>Source Message ID:</b> {selectedEvent.source_message_id}<br /></>
              )}
            </div>
          )}
        </Stack>
      </Dialog>
    </div>
  );
};

export default CalendarView;