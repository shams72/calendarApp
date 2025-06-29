'use client';

import { useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import EventCard from '../Card/EventCard';
import { useAppointment } from '../Contexts/AppointmentContext';


export const AppointmentsPanel = () => {
  const [open, setOpen] = useState(false);

  const {events} = useAppointment()

  const todaysDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  const todayEvent = events.filter(event => {
    const eventDate = new Date(event.start).toISOString().split('T')[0];
    return eventDate === todaysDate;
  });


  return (
   
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button className="w-75">Termine für heute</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 rounded-lg border p-4 shadow-sm bg-white min-h-5 max-h-140 w-75 overflow-y-scroll scrollbar-hide">
          {todayEvent.length > 0 ? (
              todayEvent.map((event) => (
                <EventCard key={event.id} event={event} badge={false}  />
              ))
            ) : <p>Es gibt keinen Termin für heute.</p>}
          
        </CollapsibleContent>
      </Collapsible>
   
  );
};
