var formulario = document.getElementById('formulario')
var botoes = document.getElementById('botoes');
var botaoAdd = document.getElementById('botaoAdd');
var doses = document.getElementById('doses_med');
var campoDoses = document.getElementById('input_doses_1');
var quantidade = document.getElementById('qtd_med');
var enderecoIP = document.getElementById('ip_pharmakos');
var slots = 1;

// Função para adicionar medicamentos
botaoAdd.addEventListener("click",()=>{
    let newDiv = document.createElement("div");

    newDiv.classList.add("input_med_"+(slots+1));
    newDiv.classList.add("slot");
    newDiv.innerHTML = 
        `<label for="nome_med_`+(slots+1)+`">Nome do `+(slots+1)+`° medicamento :</label>
        <input type="text" id="nome_med_`+(slots+1)+`" name="nome_med_`+(slots+1)+`" required>
        <br>
        <div id="input_doses_`+(slots+1)+`">
            <label id="label_horario_`+(slots+1)+`" for="input_horario_`+(slots+1)+`">Dose do `+(slots+1)+`° medicamento:</label>
            <input min=0 type="number" id="input_horario_`+(slots+1)+`" name="input_horario_`+(slots+1)+`" placeholder="Digite a frequência do medicamento" required>
            <br>
        </div>`

    botoes.parentElement.insertBefore(newDiv, botoes);
    slots++
})

// Função para adicionar horarios
//doses.addEventListener('blur', ()=>{
//})

function inserirDoses(){
    let dosesDiarias = parseInt(doses.value)
    //console.log("Doses: "+dosesDiarias)
    let horarios = document.getElementsByClassName('horario_dose').length;
    //console.log(horarios)

    if(dosesDiarias >= horarios){
        if(horarios == 0){
            createDateInput(dosesDiarias, 0);
        }
        else if(dosesDiarias == horarios){
            console.log("Show de bolice")
        }
        else{
            let newTimeInput = dosesDiarias - horarios;
            createDateInput(newTimeInput, horarios)
        }
    }
    else{
        deleteDateInput(dosesDiarias, horarios);
    }


    function deleteDateInput(nInputs, existensInputs){ // 
        let diference = existensInputs - nInputs;

        for(let i = existensInputs; i>nInputs; i--){
            let campoDeletavel = document.getElementById(`input_horario_`+i)
            let labelDeletavel = document.getElementById(`label_horario_`+i)

            campoDeletavel.parentElement.removeChild(campoDeletavel)
            labelDeletavel.parentElement.removeChild(labelDeletavel)
            console.log("iteração: "+i)
            console.log(campoDeletavel)
            console.log(labelDeletavel)

        }
    }
    function createDateInput(nInputs, existensInputs){
        let existentsDates = existensInputs + 1
        for(let i = existentsDates; i<=dosesDiarias; i++){
            //date input creation
            let newDate = document.createElement('input');
            let newDateLabel = document.createElement('label');

            newDateLabel.setAttribute("id","label_horario_"+i)
            newDateLabel.setAttribute("for","input_horario_"+i)
            newDateLabel.textContent = i+"° dose do medicamento";

            newDate.setAttribute("type","time");
            newDate.setAttribute("id", "input_horario_"+i);
            newDate.setAttribute("name", "input_horario_"+i);
            newDate.setAttribute("class", "horario_dose");
            newDate.setAttribute("required", "");
            campoDoses.appendChild(newDate);
            campoDoses.insertBefore(newDateLabel,newDate);
        }
    }
}

function cadastrarIP(){
    let linkSubmit = "http://" + enderecoIP.value + "/enviar-formulario"
    formulario.setAttribute("action", linkSubmit);
}
