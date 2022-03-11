import { useState } from 'react';

const useAlert = () => {
  const [alertStatus, setAlertStatus] = useState({
    loading: false,
    severity: null,
    message: '',
  });

  const resetAlertStatus = () => {
    setAlertStatus({ loading: false, severity: null, message: '' });
  };

  const setAlertLoadingStart = () => {
    setAlertStatus({ loading: true, severity: null, message: '' });
  };

  const setAlertLoadingStop = () => {
    setAlertStatus((prevState) => ({ ...prevState, loading: false }));
  };

  const setAlertSuccess = (message) => {
    setAlertStatus({ loading: false, severity: 'success', message });
  };

  const setAlertError = (message) => {
    setAlertStatus({ loading: false, severity: 'error', message });
  };

  return {
    loading: alertStatus.loading,
    severity: alertStatus.severity,
    message: alertStatus.message,
    resetAlertStatus,
    setAlertLoadingStart,
    setAlertLoadingStop,
    setAlertSuccess,
    setAlertError,
  };
};

export default useAlert;
