import { DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAppointment } from "../Contexts/AppointmentContext";
import EventCard from "../Card/EventCard";
import { AppointmentData } from "@/types/appointments";

interface ViewAppointmentProps {
  setAppointmentView: (open: boolean) => void;
  clickedDate: string | undefined;
  setEditView: (open: boolean) => void;
  setAppointment:(data: AppointmentData )=>void;
}


export function ViewAppointment({ setAppointmentView, clickedDate, setEditView,setAppointment }: ViewAppointmentProps) {
  const { events } = useAppointment()

  const viewAppointments = events.filter((event) => {
    if (!clickedDate || !event.start || !event.end) return false;

    const clicked = new Date(clickedDate);
    const start = new Date(event.start);
    const end = new Date(event.end);

    clicked.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return clicked >= start && clicked <= end;
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mt-4">Sie haben folgenden Termin am: <strong>{clickedDate ?? "No date selected"}</strong></DialogTitle>
        <div className="mt-2 space-y-4" >
          {viewAppointments.length > 0 ? (
            viewAppointments.map((event) => {
              const currentDate = new Date();
              const checkExpired = new Date(event.end) < currentDate;

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  badge={true}
                  setAppointmentView={setAppointmentView}
                  setEditMode={setEditView}
                  setAppointmentData={setAppointment}
                  disabled={checkExpired} 
                />
              );
            })
          ) : (
            <p>Es gibt keinen Termin {clickedDate} {new Date(clickedDate!).getDate()}</p>
          )}
           
        </div>
       {new Date(clickedDate!).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0) && (
          <Button
            size="icon"
            onClick={() => setAppointmentView(true)}
            className="sticky bottom-0 left-[50rem] bg-green-600 text-white hover:bg-green-700"
          >
            +
          </Button>
        )}  

      </DialogHeader>
      
       
    </>
  )
}
