import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
     <h1>Bem vindo a pagina home</h1> <br/>

     <Link to="/sobre">Sobre</Link> <br/>
     <Link to="/contato">Pagina contato</Link>
    </div>
  );
} 

export default App;