import { redirect } from "react-router-dom";
import { deleteContact } from "../assets/api";

export async function action({ params }) {
  const result = await deleteContact(params.contactId);
  if(!result) throw new Error('Incorrect id');
  return redirect('/');
}