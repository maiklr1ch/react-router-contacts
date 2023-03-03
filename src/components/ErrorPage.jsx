import React, { useEffect } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle';

const ErrorPage = () => {
  const error = useRouteError();
  const navigator = useNavigate();

  useTitle(`${error.status} ${error.statusText}`);

  return (
    <div id='error-page'>
      <h1>Ooops...</h1>
      There's an error occured! {error.status} {error.statusText}
      <pre>{error?.stack ?? error.error?.stack}</pre>
      <button style={{ marginTop: 8 }} onClick={() => navigator('/')}>
        Return on main
      </button>
    </div>
  )
}

export default ErrorPage