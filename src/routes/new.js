import { redirect } from "react-router-dom";
import { createContact, updateContact } from "../assets/api";

export async function action({ request }) {
  const contact = await createContact();
  const data = await request.formData();
  await updateContact(contact.id, Object.fromEntries(data));
  return redirect('/contacts/' + contact.id);
}