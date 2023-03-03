
export function useContactName(contact) {
  return contact.first || contact.last ? `${contact.first} ${contact.last}` : 'No name';
}