import _ from "lodash";
import { useCallback, useRef, useState } from "react";
import { Form, NavLink, Outlet, useLoaderData, useNavigate, useNavigation, useSubmit } from "react-router-dom"
import { useTitle } from "../hooks/useTitle";
import { useInput } from "../hooks/useInput";
import { useKeyDown } from "../hooks/useKeyDown";
import ContextMenu from "./ContextMenu";

function Root() {
  // Loading data
  const { contacts, currentQuery, requestUrl } = useLoaderData();
  // React-router navigation
  const navigation = useNavigation();
  // Searching
  const searchRef = useRef();
  const submit = useSubmit();
  const debouncedSumbit = useCallback(
    _.debounce(() => submit(searchRef.current), 200),
    [searchRef.current]
  )
  const query = useInput(currentQuery, debouncedSumbit);
  const searchText = navigation.location && new URLSearchParams(navigation.location.search).get('q');
  // ContextMenu
  const contextMenuRef = useRef();
  const [contextMenuContactId, setContextMenuContactId] = useState(null);
  const [contextMenuContactName, setContextMenuContactName] = useState(null);

  function handleContextMenu(event) {
    event.preventDefault();
    const menu = contextMenuRef.current;
    if (menu.classList.contains('active')) return handleContextHide();
    menu.classList.add('active');
    menu.style.top = event.clientY + 'px';
    menu.style.left = event.clientX + 'px';
    document.querySelector('#sidebar nav').classList.add('context-active');
    setContextMenuContactId(event.target.dataset.id);
    setContextMenuContactName(event.target.dataset.name);
  }
  // Others
  useTitle(query.value ? `Search results for "${query.value}"` : '', [query.value]);
  useKeyDown('Escape', '/');

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form
            action={new URL(requestUrl).pathname}
            method="get"
            role='search'
            id='search-form'
            ref={searchRef}
          >
            <input
              className={searchText ? 'loading' : ''}
              type="search"
              placeholder="Search..."
              aria-label="Search contacts"
              name="q"
              {...query}
            />
            <div id="search-spinner" hidden={!searchText} />
          </Form>
          <Form action="/contacts/new" method="get">
            <button>New</button>
          </Form>
        </div>
        <nav>
          {contacts.length
            ?
            <ul>
              {contacts.map(contact =>
                <li key={contact.id}>
                  <NavLink
                    data-id={contact.id}
                    data-name={(contact.first ?? 'No') + ' ' + (contact.last ?? 'name')}
                    to={'/contacts/' + contact.id}
                    className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}
                    onContextMenu={handleContextMenu}
                  >
                    {(contact.first ?? 'No') + ' ' + (contact.last ?? 'name')}
                    <div>{contact.favorite && '★'}</div>
                  </NavLink>
                </li>)}
            </ul>
            : <i>No contacts{currentQuery ? ` matching '${currentQuery}'` : ''}</i>
          }
        </nav>
        <ContextMenu
          contextRef={contextMenuRef}
          contextData={{ contextMenuContactId, contextMenuContactName, setContextMenuContactId, setContextMenuContactName }}
        />
      </div>
      <div id="detail" className={navigation.state !== 'idle' && !searchText ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  )
}

export default Root;
