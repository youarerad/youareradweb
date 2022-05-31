import { supabase } from '@libs/supabase'

/* create-contact contains our core router functions for sending contact data to our database. Each function outlines what information is expected from the database, as well as what the type definition for this information is. To work correctly, the variable within the .insert function of supabase must match the name of the column contained within the targeted supabase database. For example, there is a table named contactform, which has the following columns: name, email, department, and message. Any mismatch of column name or type definition will result in an error. */

export async function createContactForm(
  name: string,
  email: string,
  department: string,
  message: string
) {
  const { error } = await supabase.from('contactform').insert([
    {
      name: name,
      email: email,
      department: department,
      message: message,
    },
  ])
  if (error) {
    console.log(error.message)
  }
}

export async function createPartnerForm(
  name: string,
  email: string,
  company: string,
  message: string
) {
  const { error } = await supabase.from('partnership').insert([
    {
      name: name,
      email: email,
      company: company,
      message: message,
    },
  ])
  if (error) {
    console.log(error.message)
  }
}

export async function createVolunteerForm(
  name: string,
  email: string,
  volunteertype: string,
  why: string,
  experience: string
) {
  const { error } = await supabase.from('volunteercrops').insert([
    {
      name: name,
      email: email,
      volunteertype: volunteertype,
      why: why,
      experience: experience,
    },
  ])
  if (error) {
    console.log(error.message)
  }
}

export async function createNewsletterForm(email: string) {
  const { error } = await supabase.from('newsletter').insert([
    {
      email: email,
    },
  ])
  if (error) {
    console.log(error.message)
  }
}

export async function createOneTimeDonorContact(
  name: string,
  email: string,
  donation: number,
  customer_id: string
) {
  const { error } = await supabase.from('onetimedonors').insert([
    {
      name: name,
      email: email,
      donation: donation,
      customer_id: customer_id,
    },
  ])
  if (error) {
    console.log(error.message)
  }
}

export async function createMonthlyDonorContact(
  name: string,
  email: string,
  donation: number,
  customer_id: string
) {
  const { error } = await supabase.from('monthlydonors').insert([
    {
      name: name,
      email: email,
      donation: donation,
      customer_id: customer_id,
    },
  ])
  if (error) {
    console.log(error.message)
  }
}
