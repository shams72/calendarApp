'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointments } from '@/types/appointments';
import { useAppointment } from '../Contexts/AppointmentContext';
import { DatesSetArg } from '@fullcalendar/core';  // Import the correct type from FullCalendar


interface CalendarWrapperProps {
  onDateClick: (date: string) => void;
  events: Appointments[]
  setDialogOpen:(dialog: boolean)=>void,
}

export const CalendarWrapper = ({ onDateClick, events,setDialogOpen }: CalendarWrapperProps) => {


  const {fetchAppointments} = useAppointment();

   const handleNavigate = (dateInfo: DatesSetArg) => {

    const startOfMonth = dateInfo.view.currentStart;

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);  
    endOfMonth.setDate(0);  
    endOfMonth.setHours(23, 59, 59, 999); 
    
    endOfMonth.setDate(endOfMonth.getDate() + 65);
    startOfMonth.setDate(startOfMonth.getDate()-15); 
    
    const startDate = startOfMonth.toISOString();
    const endDate = endOfMonth.toISOString();

    fetchAppointments(startDate,endDate)

  };

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
        datesSet={handleNavigate}
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
