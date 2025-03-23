import {useState, useEffect} from 'react'
import {db, auth} from './firebaseConnection'
import { doc, setDoc, 
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot  } from 'firebase/firestore'
  import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
  } from 'firebase/auth'
import './app.css'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserdetail] = useState({})

  const [posts, setPosts] = useState([]);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    async function loadPosts() {
        const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
          
            let listaPost = [];
        
            snapshot.forEach((doc) => {
              listaPost.push({
                id: doc.id,
                titulo: doc.data().titulo,
                autor: doc.data().autor,
              })
            })
        })
      
    }
  }, [])

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if(user){
          console.log(user)
          setUser(true);
          setUserdetail({
            uid: user.uid,
          email: user.email 
        })
        }else{
          setUser(false);
          setUserdetail({})
        }
      })
    } 
    checkLogin();
  })

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
  

  async function excluirPost(id){
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(() => {
      alert("POST DELETADO COM SUCESSO")
    })
  }

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      alert("CADASTRADO COM SUCESSO")
      console.log(value)
      setEmail('')
      setSenha('')
    })

    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        alert('SENHA MUITO FRACA')
      }else if(error.code === 'auth/email-already-in-use'){
        alert('Email ja existe!')
      }
    })
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("USER LOGADO COM SUCESSO")

      setUserdetail({
        vid: value.user.uid,
        email: value.user.email,
      })
      setUser(true);

      setEmail('')
      setSenha('')
    })
    .catch(() => {
      console.log("ERRO AO FAZER O LOGIN")
    })
  }

  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserdetail({})
  }


  return (
    <div>
      <h1>React JS + Fire Base</h1>

      {user && (
        <div>
          <strong>Seja bem-vindo(a) Voce esta logado!</strong> <br/>
          <span>ID: {userDetail.uid} -Email: {userDetail.email}</span> 
          <button onClick={fazerLogout}>Sair da conta</button>
          </div>

      )}

      <div className='container'>
        <h2>Usuarios</h2>
        <label>Email</label>
        <input value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Digite um email'
        /> <br/>

        <label>Senha</label>
        <input value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder='Digite uma senha'
        />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Fazer login</button>
        
        
      </div> 
      <hr/> <br/> <br/>


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
              <span>Autor: {post.autor}</span> <br/> 
              <button onClick={() => excluirPost(post.id)}>Excluir</button>

            </li>
          )
         })}
        </ul>
      </div>
    </div>
  );
}

export default App;
