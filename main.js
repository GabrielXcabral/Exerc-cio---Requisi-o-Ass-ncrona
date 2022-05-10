'use strict';

const limparFormulario = (endereco) => {
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = ''; 
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
}

const preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('cidade').value = endereco.localidade;
}

const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);


const pesquisarCep = async() => {
    
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    

    if (cepValido (cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();


        if (endereco.hasOwnProperty('erro')){
            document.getElementById('rua').value = 'CEP não encontrado!';
        }else{
            preencherFormulario(endereco)
        }

    }else{
        document.getElementById('rua').value = 'CEP não encontrado!';
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
