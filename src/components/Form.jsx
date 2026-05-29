import { useState, useEffect } from 'react';

const takenUsername = ['admin', 'user', 'test', 'demo', 'mario', 'luigi'];

function Form() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [usernameStatus, setUsernameStatus] = useState('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState(false);

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

  //Validiamo username
  const handleUsernameChange = (e) => {
    setFormData((prev) => ({ ...prev, username: e.target.value }));
    setUsernameStatus('idle');
  };

  //Validiamo l'email
  const validateEmail = (email) => {
    if (!email.trim()) return 'Email è richiesta';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return 'Email non valida';
    if (email.length > 50) return 'Email troppo lunga';
    return '';
  };

  const handleMailChange = (e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (emailTouched) {
      setEmailError(validateEmail(e.target.value));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(formData.email));
  };

  //Ulteriore controllo sui campi del form
  const isFormValid = () => {
    return (
      formData.username.length >= 3 &&
      usernameStatus === 'available' &&
      formData.email.trim() &&
      !emailError
    );
  };

  //Submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    setIsSubmitting(false);

    setShowSuccess(true);
  };

  if (showSuccess) {
    return <SuccessMessage></SuccessMessage>;
  }

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
          className={`form-control ${emailTouched && emailError ? 'border border-warning' : 'border border-secondary'}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={formData.email}
          onChange={handleMailChange}
          onBlur={handleEmailBlur}
          placeholder="Inserisci la tua mail"
        />

        {emailTouched && emailError && <p className="text-sm">{emailError}</p>}
        <div id="emailHelp" className="form-text">
          {validateEmail(formData.email) === '' && (
            <div>
              <p>Email Valida</p>
            </div>
          )}
          Non condivideremo mai la tua mail con nessun altro
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

function SuccessMessage() {
  return (
    <div className="container bg bg-success rounded">
      <div className="mt-5 p-5 text-white">
        <h2>Complimenti ti sei registrato</h2>
      </div>
    </div>
  );
}

export default Form;
