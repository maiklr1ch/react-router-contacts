import { updateContact } from "../assets/api";
import { getContact } from "../assets/api";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) throw new Response(null, { status: 404, statusText: "Contact not found" });
  return { contact };
}

export async function action({ params, request }) {
  const data = await request.formData();
  const contact = await updateContact(params.contactId, { favorite: data.get('favorite') === 'true' });
  return { contact };
}