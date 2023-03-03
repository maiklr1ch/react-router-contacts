import React from 'react'
import { useInput } from '../hooks/useInput';
import { Form, useNavigate } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';
import { useKeyDown } from '../hooks/useKeyDown';

const NewContact = () => {
  const firstName = useInput('');
  const lastName = useInput('');
  const twitter = useInput('');
  const avatar = useInput('');
  const notes = useInput('');

  const navigator = useNavigate();

  useTitle(`Create contact`);
  useKeyDown('Escape', -1);

  return (
    <div>
      <h2>Create contact</h2>
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
          <button type="submit">Add</button>
          <button type="button" onClick={() => navigator(-1)}>Cancel</button>
        </p>
      </Form>
    </div>
  );
}

export default NewContact;