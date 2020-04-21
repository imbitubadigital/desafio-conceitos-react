import React, { useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
      api.get('/repositories').then(repo => setRepositories(repo.data));
  }, []);

  async function handleAddRepository() {
      const repository = {
        title: 'Conceitos React',
        url: 'https://github.com/imbitubadital',
        techs: ['node.js', 'ReactJs']
      }
      const { data } = await api.post('/repositories', repository);
      setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(r => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(r => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
