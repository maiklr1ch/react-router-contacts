import React from 'react'
import { Form, useLoaderData, useNavigate } from 'react-router-dom'
import { useInput } from '../hooks/useInput';
import { useContactName } from '../hooks/useContactName';
import { useTitle } from '../hooks/useTitle';
import { useKeyDown } from '../hooks/useKeyDown';

const EditContact = () => {
  const { contact } = useLoaderData();
  const contactName = useContactName(contact);

  const firstName = useInput(contact.first);
  const lastName = useInput(contact.last);
  const twitter = useInput(contact.twitter);
  const avatar = useInput(contact.avatar);
  const notes = useInput(contact.notes);

  const navigator = useNavigate();

  useTitle(`Edit ${contactName}`);
  useKeyDown('Escape', -1);

  return (
    <div id='contact-edit'>
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>
        Edit contact [{contactName}]
      </h2>
      <Form method="post" id="contact-form">
        <p>
          <span>Name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            {...firstName}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            {...lastName}
          />
        </p>
        <label>
          <span>Twitter</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            {...twitter}
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            {...avatar}
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea
            name="notes"
            {...notes}
            rows={6}
          />
        </label>
        <p>
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
            Save
          </button>
          <button type="button" onClick={() => navigator('/contacts/' + contact.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
            Cancel
          </button>
        </p>
      </Form>
    </div>
  )
}

export default EditContact