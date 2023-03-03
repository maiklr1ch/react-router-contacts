import { redirect } from 'react-router-dom';
import { getContact, updateContact } from '../assets/api';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) throw new Response(null, { status: 404, statusText: "Contact not found" });
  return { contact };
}

export async function action({ request, params }) {
  const data = await request.formData();
  const updates = Object.fromEntries(data);
  await updateContact(params.contactId, updates);
  return redirect('/contacts/' + params.contactId);
}