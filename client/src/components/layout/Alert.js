import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    <section className="container">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </section>
  );
};

export default Alert;
