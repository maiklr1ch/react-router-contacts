import React from 'react'

const ContextMenuItem = ({ chlidren, handler, ...props }) => {
  return (
    <li onClick={handler} {...props}>
      {chlidren}
    </li>
  )
}

export default ContextMenuItem