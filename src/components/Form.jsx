import { useState } from 'react';

const takenUsername = ['admin', 'user', 'test', 'demo', 'mario', 'luigi'];

function Form() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [usernameStatus, setUsernameStatus] = useState('idle');

  const handleUsernameChange = (e) => {
    setFormData((prev) => ({ ...prev, username: e.target.value }));
    setUsernameStatus('idle');
  };

  const handleMailChange = (e) => {
    return;
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className={`form-control ${usernameStatus === 'taken' ? 'border border-warning' : usernameStatus === 'available' ? 'border border-success' : 'border border-secondary'}`}
          id="exampleInputPassword1"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Inserisci il tuo username"
        />

        <div className="mt-3">
          {usernameStatus === checking && (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Stiamo controllando</span>
            </div>
          )}

          {usernameStatus === available && (
            <div className="bg bg-success">
              <p>Il nome è disponibile</p>
            </div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={mail}
          onBlur={handleMailChange}
          placeholder="Inserisci la tua mail"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Form;
