'use client';

import EventCard from '../Card/EventCard';
import { useAppointment } from '../Contexts/AppointmentContext';
import { Card, CardContent } from '../ui/card';


export const AppointmentsPanel = () => {

  const {events} = useAppointment()

  const todaysDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  const todayEvent = events.filter(event => {
    const eventDate = new Date(event.start).toISOString().split('T')[0];
    return eventDate === todaysDate;
  });


  return (
   
    <div className="w-80 mr-2 mt-5">
     <div className="flex flex-col items-center gap-2">
    
    <div className="relative inline-block">
      <h2 className="text-xl font-semibold tracking-tight">Heutige Termine</h2>
      <div  className="absolute -bottom-2 left-0 right-0 h-px border-t-2 border-dotted border-primary w-full opacity-80" /></div>
    </div>
    
    
      <Card className="shadow-sm pr-0 pl-0 pt-2.5 pb-0 mt-4 h-[80vh] ">
        <CardContent className="p-0 pr-2 pl-2 overflow-y-scroll scrollbar-hide">
          {todayEvent.length > 0 ? (
            <div className="space-y-4">
              {todayEvent.map((event) => (
                <EventCard 
                  key={event.id}
                  event={event}
                  badge={false}
                  notes={false}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                Es gibt keinen Termin für heute.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
   
};
