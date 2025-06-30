'use client';

import React, { useState } from 'react';
import { EventDialog } from './Calendar/EventDialog';
import { CalendarFilter } from './Calendar/CalendarFilter';
import { AppointmentsPanel } from './Calendar/AppointmentsPanel';
import { CalendarWrapper } from './Calendar/CalendarWrapper';
import { useAppointment } from './Contexts/AppointmentContext';
import { PatientSelector } from './Calendar/PatientSelector';
import HelpDropdown from './HelpDropDown';
const MyCalendar: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [patient, setPatient] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
 
  const { currentEvents} = useAppointment();

  return (
    <>
    <div  className="flex flex-row items-start w-full gap-5">
      <div className="relative w-[79%] h-[70vh] ml-[30px] mt-[10px]">
        <CalendarWrapper  onDateClick={setSelectedDate} events={currentEvents} setDialogOpen={setDialogOpen}/>
       <div className="absolute top-[2px] left-0 w-[10rem] flex flex-row gap-2">
          <CalendarFilter setCategory={setCategory} patient={patient} />
          <PatientSelector setPatient={setPatient} category={category}/>
          <HelpDropdown/>
        </div>
       
      </div> 
      <div className="flex flex-col mt-[50px]">
        <AppointmentsPanel/>
      </div>
    </div>
    {dialogOpen && <EventDialog  open={dialogOpen}  onOpenChange={setDialogOpen} clickedDate={selectedDate}/>}
    </>
  );
};

export default MyCalendar;
