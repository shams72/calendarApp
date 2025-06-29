'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointments } from '@/types/appointments';

interface CalendarWrapperProps {
  onDateClick: (date: string) => void;
  events: Appointments[]
  setDialogOpen:(dialog: boolean)=>void,
}

export const CalendarWrapper = ({ onDateClick, events,setDialogOpen }: CalendarWrapperProps) => {
  return (
   
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        nowIndicator
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'  
        }}
        selectable
        height="95vh"
        events={events}
        dateClick={(info) => {
        onDateClick(info.dateStr);
        setDialogOpen(true);
        }}

      />

   
  );
};
