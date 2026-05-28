import { useState } from 'react';

function Toggle() {
  const [visible, setVisible] = useState(false);

  function setIt() {
    setVisible(!visible);
  }

  return (
    <div>
      <h2>Qui proviamo il toggle</h2>

      <button className="btn btn-primary mb-3" onClick={setIt}>
        {visible ? 'Nascondi' : 'Mostra'} Contenuto
      </button>
      {visible && (
        <div className="mt-3 bg-primary text-white">
          <p>Questo contenuto è ora visible</p>
        </div>
      )}
    </div>
  );
}

export default Toggle;
