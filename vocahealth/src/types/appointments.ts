export interface Category {
  id: string,
  label: string,
  description: string,
  color: string
}

export interface Patient {
  created_at: string; // ISO 8601 timestamp
  firstname: string;
  id: string,
  lastname: string;
  birth_date: string | null; // ISO 8601 date or null
  care_level: number | null;
  pronoun: string | null;
  email: string | null;
  active: boolean | null;
  active_since: string | null; // ISO 8601 timestamp or null
}
 

export interface Appointments {
  id: string;
  created_at: string;        
  updated_at: string | null; 
  start: string;             
  end: string;              
  location: string;
  patient: Patient;         
  attachements: string | null; 
  category: Category;          
  notes: string;
  title: string;
  allDay?:boolean;
  color?: Category['color'];
}


export interface AppointmentData {
  id:string;
  patient:string;
  location: string ;
  eventTitle: string;
  start?: string;
  end: string;
  category: string;
  notes: string | undefined;
}

export interface FormSchema {
  patient: string;
  eventTitle: string;
  category: string;
  location: string;
  start: Date;
  end: Date;
  notes?: string;
}

export interface UpdateSchema {
   id: string,
  patient: string;
  eventTitle: string;
  category: string;
  location: string;
  start: Date;
  end: Date;
  notes?: string;
}
