import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.png';

import './styles.css'

export default function New({ history }){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnai] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null // Criando URL para uma varíavel temporária
    }, [thumbnail]);

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData(); // Enviando dados do formulário para a rota 
        const user_id = localStorage.getItem('user') // Pegando id do usuário logado pelo LocalStorage
        
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        }) // Chamando a API

        history.push('/dashboard');
    }

    return(
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnai(event.target.files[0])} />
                <img src={camera} alt="Selecione uma imagem"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input type="text" id="company" placeholder="Sua empresa" value={company} onChange={event => setCompany(event.target.value)} />

            <label htmlFor="company">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input type="text" id="techs" placeholder="Quais tecnologisa usam?" value={techs} onChange={event => setTechs(event.target.value)} />

            <label htmlFor="company">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input type="text" id="price" placeholder="Valor cobrado por dia" value={price} onChange={event => setPrice(event.target.value)} />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}