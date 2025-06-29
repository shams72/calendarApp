'use client';

import React, { useState } from 'react';
import { EventDialog } from './Calendar/EventDialog';
import { CalendarFilter } from './Calendar/CalendarFilter';
import { AppointmentsPanel } from './Calendar/AppointmentsPanel';
import { CalendarWrapper } from './Calendar/CalendarWrapper';
import { useAppointment } from './Contexts/AppointmentContext';


const MyCalendar: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
 
  const { currentEvents} = useAppointment();

  return (
    <>
    <div  className="flex flex-row items-start w-full gap-8">
      <div className="relative w-[76%] h-[70vh] ml-[30px] mt-[10px]">
        <CalendarWrapper  onDateClick={setSelectedDate} events={currentEvents} setDialogOpen={setDialogOpen}/>
        <div style={{ position: 'absolute', top: 0, left: 120 , width:"10rem"}} >
          <CalendarFilter />
        </div>
       
        
      </div> 
      <div className="flex flex-col mt-[75px]">
        <AppointmentsPanel/>
      </div>
    </div>
    {dialogOpen && <EventDialog  open={dialogOpen}  onOpenChange={setDialogOpen} clickedDate={selectedDate}/>}
    </>
  );
};

export default MyCalendar;
