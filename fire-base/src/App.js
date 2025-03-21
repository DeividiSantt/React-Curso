import {useState} from 'react'
import {db} from './firebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc  } from 'firebase/firestore'
import './app.css'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')

  const [posts, setPosts] = useState([]);

  async function handleAdd(){
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setAutor('');
      setTitulo('')
    })

    .catch((error) => {
      console.log("ERRO" + error);
    })
    
    
  }

  async function buscarPost(){
  //  const postRef = doc(db, "posts", "12345")

  //  await getDoc(postRef)
  //  .then((snapshot) => {
  //    setAutor(snapshot.data().autor)
  //    setTitulo(snapshot.data().titulo)
  //  })

  const postsRef = collection(db, "posts")
  await getDocs(postsRef)
  .then((snapshot) => {
    let lista = [];

    snapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        titulo: doc.data().titulo,
        autor: doc.data().autor,
      })
    })
    setPosts(lista);

  })
  .catch((error) =>{
    console.log("DEU ALGUM ERRO AO BUSCAR")
  })

  }

  async function editarPost(){
    const docRef =  doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("POST ATUALIZADO!")
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(() => {
      console.log("ERRO AO ATUALIZAR O POST")
    })
  }
  


  return (
    <div>
      <h1>React JS + Fire Base</h1>

      <div className='container'>

        <label>ID do Post:</label>
        <input
          placeholder='Digite o ID do post'
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)} 
        /> <br/>

        <label>Titulo:</label>
        <textarea
        type="text"
        placeholder='digite o titulo'
        value={titulo}
        onChange={ (e) => setTitulo(e.target.value)}
        />
        

        <label>Autor:</label>
        <input type='text' 
        placeholder='Autor do post'
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar posts</button>
        <button onClick={editarPost}>Atualizar post</button>
        <ul>
         {posts.map((post) => {
          return(
            <li>
              <strong>ID: {post.id}</strong> <br/>
              <span>Titulo: {post.titulo}</span> <br/>
              <span>Autor: {post.autor}</span> <br/> <br/>

            </li>
          )
         })}
        </ul>
      </div>
    </div>
  );
}

export default App;
