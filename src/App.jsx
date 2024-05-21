import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState('')
  const [error, setError] = useState("");
 

  const handleSearch = (e) => {
    e.preventDefault()
    setInput("")

    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

    if (cepRegex.test(input.trim()))  {
      axios.get(`https://viacep.com.br/ws/${input}/json/`)
        .then(res => {
          setCep(res.data)
          setError("");
        })
        .catch(Error => {
          console.error("Erro ao buscar o CEP:", Error)
          setError("Erro ao buscar o CEP. Tente novamente.");
        })
       
    } else {
      setError("CEP inválido. Por favor, insira um CEP no formato  XXXXXXXX ou XXXXX-XXX.");
    }
  }


  const value_input = (e) => {
    setInput(e.target.value)

  }
 

  return (
    <>
      <div className='container_cep'>
          <span>{error}</span>
          <h1>Buscador de CEP</h1>

          <div className='operations_style'>
            <input type="text" placeholder='Digite o CEP' value={input} onChange={value_input} />
            <button onClick={handleSearch} > <i className="bi bi-search"> </i></button>
          </div>
          {Object.keys(cep).length > 0 && (
            <main className='information_cep'>
              <p> <span>CEP : </span>{cep.cep}</p>
              <p> <span>Rua : </span>{cep.logradouro}</p>
              <p> <span>Bairro :</span> {cep.bairro} </p>
              <p> <span>Localidade :</span> {cep.localidade}</p>
              <p><span>Estado :</span> {cep.uf} </p>
            </main>

          )}


      </div>
    </>
  )
}

export default App
