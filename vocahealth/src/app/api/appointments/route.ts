import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/SupabaseClient'

export async function GET() {
const { data:  appointments, error } = await supabase
  .from('appointments')
  .select(`
    *,
    category:categories (
      id,
      created_at,
      updated_at,
      label,
      description,
      color,
      icon
    ),
    patient:patients (
    id,
    created_at,
    firstname,
    lastname,
    birth_date,
    care_level,
    pronoun,
    email,
    active,
    active_since
    )

  `);


  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: allPatients, error: patientsError } = await supabase
    .from('patients')
    .select(`
      id,
      created_at,
      firstname,
      lastname,
      birth_date,
      care_level,
      pronoun,
      email,
      active,
      active_since 
      `);

  if (patientsError) {
    return NextResponse.json({ error: patientsError.message }, { status: 500 });
  }

  return NextResponse.json({
    appointments,
    allPatients,
  });
 
}


export async function POST(req: NextRequest) {
  
  const body = await req.json();

  const {start, end, location, patient, attachements, category, notes, title} = body;

  const { data, error } = await supabase.from('appointments').insert(
    [{
      start,
      end,
      location,
      patient,
      attachements, 
      category, 
      notes,
      title
    }]).select(`
    *,
    category:categories( id,
      created_at,
      updated_at,
      label,
      description,
      color,
      icon),
    patient:patients (
    id,
    created_at,
    firstname,
    lastname,
    birth_date,
    care_level,
    pronoun,
    email,
    active,
    active_since
    ) 
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }



  return NextResponse.json({ message: 'Appointment created', data });
}

export async function PUT(req: NextRequest) {
  
const body = await req.json();

  const {id, patient, title,  category, location, start, end,  notes} = body;

  const { data, error } = await supabase.from('appointments').update(
    [{
      id,
      start,
      end,
      location,
      patient,
      notes, 
      category, 
      title
    }]) .eq('id', id).select(`
    *,
    category:categories( id,
      created_at,
      updated_at,
      label,
      description,
      color,
      icon),
    patient:patients (
    id,
    created_at,
    firstname,
    lastname,
    birth_date,
    care_level,
    pronoun,
    email,
    active,
    active_since
    ) 
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Appointment Edited', data });
}