import { useState, useEffect } from 'react';

const takenUsername = ['admin', 'user', 'test', 'demo', 'mario', 'luigi'];

function Form() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [usernameStatus, setUsernameStatus] = useState('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formData.username.length < 3) {
      setUsernameStatus('idle');
      return;
    }

    const checkUsername = async () => {
      setUsernameStatus('checking');

      //   Simulazione chiamata Api
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const isAvailable = !takenUsername.includes(
        formData.username.toLowerCase(),
      );

      setUsernameStatus(isAvailable ? 'available' : 'taken');
    };

    const timer = setTimeout(checkUsername, 500);
    return () => clearTimeout(timer);
  }, [formData.username]);

  const handleUsernameChange = (e) => {
    setFormData((prev) => ({ ...prev, username: e.target.value }));
    setUsernameStatus('idle');
  };

  const handleMailChange = (e) => {
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    setIsSubmitting(false);

    setShowSuccess(true);
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
          value={formData.username}
          onChange={handleUsernameChange}
          placeholder="Inserisci il tuo username"
        />

        <div className="mt-3">
          {usernameStatus === 'checking' && (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Stiamo controllando</span>
            </div>
          )}

          {usernameStatus === 'available' && (
            <div className="bg bg-success text-white p-3 rounded">
              <p className="h5">Il nome è disponibile</p>
            </div>
          )}

          {usernameStatus === 'taken' && (
            <div className="bg bg-danger text-white p-3 rounded">
              <p>Il nome è stato già preso</p>
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
          value={formData.email}
          onChange={handleMailChange}
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
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!isFormValid() || isSubmitting}
        className={`btn btn-primary ${isFormValid() && !isSubmitting ? 'bg bg-primary ' : 'bg bg-secondary'}`}
      >
        {isSubmitting ? <span>Inviando</span> : 'registrati'}
      </button>
    </form>
  );
}

export default Form;
