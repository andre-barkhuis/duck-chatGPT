import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  Container,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  desc?: string;
}

const FocusBoard: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const events: CalendarEvent[] = [
    {
      title: 'Deep Work Session',
      start: new Date(2025, 4, 7, 9, 0),
      end: new Date(2025, 4, 7, 11, 0),
      desc: 'Working on model architecture',
    },
    {
      title: 'Team Sprint Review',
      start: new Date(2025, 4, 8, 14, 0),
      end: new Date(2025, 4, 8, 15, 0),
      desc: 'Reviewing completed tasks with the team',
    },
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        🎯 Focus Board
      </Typography>

      <Paper elevation={3}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />
      </Paper>

      <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <Typography>{selectedEvent?.desc}</Typography>
          <Typography variant="caption">
            {selectedEvent?.start.toString()} – {selectedEvent?.end.toString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedEvent(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FocusBoard;
