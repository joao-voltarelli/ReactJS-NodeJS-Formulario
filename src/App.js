import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/Input';
import Textarea from './components/Form/Textarea';
import Checkbox from './components/Form/Checkbox';
import Select from './components/Form/Select';

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {

      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        descricao: Yup.string().required('O campo não pode ser vazio'),
        selecionado: Yup.string().required('Escolha uma opção')
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data);

      var dadosCheckbox = check(data);

      var dados = 'Nome: ' + data.nome + ' | Email: ' + data.email + ' | Descrição: ' + data.descricao + ' | Opções marcadas: ' + dadosCheckbox + ' | Opção selecionada: ' + data.selecionado;
      const fetch = require('node-fetch');
      fetch('https://api.trello.com/1/cards?key=98c4c8dc8e8f352b429f71256894dbe1&token=79a12ae72f0836db43030f692566076a5a75e343457b675b5c4eceb4afc75ccf&idList=605fa145d3ac3c29059b4eb9&name=Usuario&desc=' + dados, {
        method: 'POST',
      })
        .then(response => {
          console.log(
            `Response: ${response.status} ${response.statusText}`
          );
          return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));

      formRef.current.setErrors({});

      reset();

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  const selectOptions = [
    { value: 'select1', label: 'Select 1' },
    { value: 'select2', label: 'Select 2' },
    { value: 'select3', label: 'Select 3' },
  ]

  return (
    <div className="App">
      <h1>Formulário</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <p>Name</p>
        <Input name="nome" />
        <p>E-mail</p>
        <Input name="email" /><br></br>
        <Textarea name="descricao" placeholder="Type something..." /><br></br>
        <Checkbox class="checkbox"
          name="Opcao1"
          value="opcao1"
          label="Opção 1"
        />
        <Checkbox class="checkbox"
          name="Opcao2"
          value="opcao2"
          label="Opção 2"
        />
        <Checkbox class="checkbox"
          name="Opcao3"
          value="opcao3"
          label="Opção 3"
        />
        <p>Dropdown</p>
        <Select
          name="selecionado"
          options={selectOptions}
        >
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select><br></br><br></br>

        <button type='submit'>ENVIAR</button><br></br><br></br><br></br><br></br>
        <br></br><a href="https://trello.com/b/D15ccHjN/formulario" target="_blank" rel="noreferrer">Link para o board utilizado no Trello</a>
        <br></br><br></br><a href="https://github.com/joao-voltarelli/formulario-teste/tree/master" target="_blank" rel="noreferrer">Link para o projeto no Github</a>
      </Form>
    </div>
  );
}

function check(checkbox) {
  var opcoesSelecionadas = "";
  if (checkbox.Opcao1 === true)
    opcoesSelecionadas = "Opção 1, ";
  if (checkbox.Opcao2 === true)
    opcoesSelecionadas = opcoesSelecionadas + "Opção 2, ";
  if (checkbox.Opcao3 === true)
    opcoesSelecionadas = opcoesSelecionadas + "Opção 3 ";
  if (checkbox.Opcao1 === false && checkbox.Opcao2 === false && checkbox.Opcao3 === false)
    opcoesSelecionadas = "Nenhuma opção foi marcada";

  return opcoesSelecionadas;
}

export default App;
