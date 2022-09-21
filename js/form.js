var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoFormulario(form);

    

    var erros = validaPaciente(paciente);

    if(erros.length > 0) {
        exibeMensagensDeErro (erros);        
        return;
    }
    
    adicionaPacienteNaTabela(paciente);

    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";

});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {    
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente"); 

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado,classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    
    return td;
}

function validaPaciente(paciente) {

    var erros = [];
    
    if (!validaPeso(paciente.peso)) {
        erros.push("O valor do peso inserido não é válido !")
    }

    if (!validaAltura(paciente.altura)) {
        erros.push("O valor da altura inserida não é válida !")
    }

    if( paciente.nome.length === 0) {
        erros.push("Por favor, adicione o nome do paciente !")
    }
    
    if ( paciente.peso.length === 0) {
        erros.push("Por favor, adicione o peso do paciente !")
    }

    if ( paciente.altura.length === 0) {
        erros.push("Por favor, adicione a altura do paciente !")
    }
    
    if( paciente.gordura.length === 0) {
        erros.push("Por favor, adicione a porcentagem de gordura do paciente !")
    }
    

    return erros;
}
