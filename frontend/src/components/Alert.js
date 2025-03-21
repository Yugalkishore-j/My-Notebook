import React, { useContext } from 'react'
import { AlertContext } from '../context/notes/AlertContext';

function Alert() {
    const { alert } = useContext(AlertContext);
    const Capitalize = (word) => {
      if (word === "danger"){
        word = "error";
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div className="alert" >
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{Capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      )}
    </div>
    )
}

export default Alert
