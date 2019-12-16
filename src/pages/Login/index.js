import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){ // History é utilizado para fazer navegação
    const [email, setEmail] = useState(''); // Definindo o estado do componente

    async function handleSubmit(event){
        event.preventDefault(); // Previni o seu funcionamento padrão

        const response = await api.post('/sessions', { email }) // Chamando a API com o método POST e a rota

        const { _id } = response.data; // Pegando apenas o id do usuário logado

        localStorage.setItem('user', _id); // Armazenando o id no banco de dados do navegador para utilizá-lo na aplicação

        history.push('/dashboard') // Enviando para página Dashboard assim que o login for realizado
    }

    return(
        <>
            <p>
            Ofereça <strong>spots</strong> para progamadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}/>

            <button type="submit" className="btn">Entrar</button>
            </form>
        </>
    );
}