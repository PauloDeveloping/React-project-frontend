import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'

export default function Dashboard(){
    const [spots, setSpots] = useState([]); // Criando um estado que receberá listagem de dados 

    useEffect(() => { // Serve para realizar busca iniciais de dados vindos de API
        async function loadSpots(){
            const user_id = localStorage.getItem('user') // Pegando id do usuário pelo LocalStorage
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data); // Dados dos Spots vindo da API
        }

        loadSpots();
    }, []); // Quando o Array está vázio quer dizer que a função será executada somente uma vez

    return(
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}