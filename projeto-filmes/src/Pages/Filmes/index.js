import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../Services/api'
import './filme-info.css'

function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadFilme() {
        await api.get(`/movie/${id}`, {
            params:{
                api_key:"c9b359a8a23e20dceea61099b3a94bd1",
                language: "pt-BR"
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);

            })
            .catch(() => {
                console.log('FILME NÃO ENCONTRADO')
            })
        }
        loadFilme();
     

        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [])


    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            alert('esse filme já esta na lista')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com ")
    }

        if(loading){
            return(
                <div className='filme-info'>
                    <h1>CARREGANDO DETALHES</h1>
                </div>
            )
        }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
           
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
        

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href='#'>Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Filme;