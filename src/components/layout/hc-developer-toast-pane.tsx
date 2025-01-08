import React, { useState } from 'react';
import { toast } from 'react-toastify';

const HcDeveloperToastPane: React.FC = () => {
  const defaultSuccessMessage = 'Success message';
  const defaultErrorMessage = 'Error message';
  const defaultWarningMessage = 'Warning message';
  const defaultInfoMessage = 'Info message';

  const [successMessage, setSuccessMessage] = useState(defaultSuccessMessage);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
  const [warningMessage, setWarningMessage] = useState(defaultWarningMessage);
  const [infoMessage, setInfoMessage] = useState(defaultInfoMessage);

  return (
    <div className={'hc-dev-toast-pane'}>
      <h3>Toast Sandbox</h3>
      {/* Success Toast */}
      <div className={'hc-dev-toast-row'}>
        <button
          className={'hc-dev-toast-button'}
          onClick={() => toast.success(successMessage)}
        >
          Show Success
        </button>
        <input
          type={'text'}
          className={'hc-dev-toast-input'}
          placeholder={defaultSuccessMessage}
          value={successMessage}
          onChange={(fieldChangeEvent) =>
            setSuccessMessage(fieldChangeEvent.target.value)
          }
        />
      </div>

      {/* Error Toast */}
      <div className={'hc-dev-toast-row'}>
        <button
          className={'hc-dev-toast-button'}
          onClick={() => toast.error(errorMessage)}
        >
          Show Error
        </button>
        <input
          type={'text'}
          className={'hc-dev-toast-input'}
          placeholder={defaultErrorMessage}
          value={errorMessage}
          onChange={(fieldChangeEvent) =>
            setErrorMessage(fieldChangeEvent.target.value)
          }
        />
      </div>

      {/* Warning Toast */}
      <div className={'hc-dev-toast-row'}>
        <button
          className={'hc-dev-toast-button'}
          onClick={() => toast.warn(warningMessage)}
        >
          Show Warning
        </button>
        <input
          type={'text'}
          className={'hc-dev-toast-input'}
          placeholder={defaultWarningMessage}
          value={warningMessage}
          onChange={(fieldChangeEvent) =>
            setWarningMessage(fieldChangeEvent.target.value)
          }
        />
      </div>

      {/* Info Toast */}
      <div className={'hc-dev-toast-row'}>
        <button
          className={'hc-dev-toast-button'}
          onClick={() => toast.info(infoMessage)}
        >
          Show Info
        </button>
        <input
          type={'text'}
          className={'hc-dev-toast-input'}
          placeholder={defaultInfoMessage}
          value={infoMessage}
          onChange={(fieldChangeEvent) =>
            setInfoMessage(fieldChangeEvent.target.value)
          }
        />
      </div>
    </div>
  );
};

export default HcDeveloperToastPane;
