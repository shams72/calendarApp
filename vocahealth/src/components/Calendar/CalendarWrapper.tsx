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
        locale="de" 
        headerToolbar={{
          right: 'today prev,next',
          center: 'title',
          left: 'dayGridMonth,timeGridWeek',
        }}
        buttonText={{
          today: 'Heute',
          month: 'Monat',
          week: 'Woche',
          day: 'Tag',
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'  
        }}
        allDaySlot={false}
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
