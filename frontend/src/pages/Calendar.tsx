import React, { useContext, useMemo, useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppStateContext } from '../state/AppProvider';
import { Dialog, DialogType, Stack } from '@fluentui/react';

const localizer = momentLocalizer(moment);
const allViews: View[] = ['month', 'week', 'work_week', 'day', 'agenda'];

const CalendarView: React.FC = () => {
  const appStateContext = useContext(AppStateContext);
  const conversations = appStateContext?.state.chatHistory || [];

  const events = useMemo(
    () =>
      conversations.map(conv => {
        let eventTitle = conv.title;
        if (!eventTitle && conv.messages && conv.messages.length > 0) {
          const firstUserMsg = conv.messages.find(m => m.role === 'user');
          eventTitle = firstUserMsg ? (typeof firstUserMsg.content === 'string' ? firstUserMsg.content : '[Message]') : 'Conversation';
        }
        return {
          title: eventTitle,
          start: new Date(conv.date),
          end: new Date(conv.date),
          allDay: true,
          conversationId: conv.id,
          conversation: conv
        };
      }),
    [conversations]
  );

  const [selectedConv, setSelectedConv] = useState<any>(null);

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={events}
        step={60}
        views={allViews}
        defaultView="month"
        defaultDate={new Date()}
        onSelectEvent={event => setSelectedConv(event.conversation)}
        popup
      />
      <Dialog
        hidden={!selectedConv}
        onDismiss={() => setSelectedConv(null)}
        dialogContentProps={{
          type: DialogType.normal,
          title: selectedConv?.title || 'Conversation',
          subText: `Conversation ID: ${selectedConv?.id}`
        }}
        modalProps={{
          isBlocking: false
        }}
      >
        <Stack>
          {selectedConv?.messages?.map((msg: any) => (
            <div key={msg.id} style={{ marginBottom: 12 }}>
              <b>{msg.role}:</b>{' '}
              {typeof msg.content === 'string' ? msg.content : '[complex message]'}
              <div style={{ fontSize: 12, color: '#888' }}>{msg.date}</div>
            </div>
          ))}
        </Stack>
      </Dialog>
    </div>
  );
};

export default CalendarView;