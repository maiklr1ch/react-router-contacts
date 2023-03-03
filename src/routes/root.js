import { redirect } from "react-router-dom";
import { createContact, getContacts } from "../assets/api";

export async function loader({ request }) {
  const query = new URL(request.url).searchParams.get('q');
  const contacts = await getContacts(query);
  return { contacts, currentQuery: query, requestUrl: request.url };
}

export async function action() {
  const contact = await createContact();
  return redirect('/contacts/' + contact.id + '/edit');
}
