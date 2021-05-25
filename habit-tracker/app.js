const adicionarHabito = document.querySelector(".adicionar-habito");
const listaHabito = document.querySelector(".habitos");
const habitos = JSON.parse(localStorage.getItem("habitos")) || [];

// Adicionar Habito
function addHabito(e) {
    e.preventDefault();
    const text = this.querySelector("[name=habito]").value;
    const totalContagem = +this.querySelector("[name=reps]").value;
    const timeframe = this.querySelector("[name=timeframe]").value;
    const habito = {
        text: text,
        reps: 0,
        totalContagem: totalContagem,
        timeframe: timeframe,
        completed: false,
    };

    habitos.push(habito);
    listarHabitos(habitos, listaHabito);
    localStorage.setItem("habitos", JSON.stringify(habitos));
    this.reset();
    console.log(habito);
}

// Listar Habitos
function listarHabitos(habito = [], listaHabito) {
    listaHabito.innerHTML = habitos.map((habito, i) => {
        return `
            <li>
            <input type="checkbox" data-index=${i} id="habito${i}" ${habito.completed ? "checked" : ""} />
            <label for="habito${i}"><span>${habito.reps}/${habito.totalContagem} ${habito.timeframe} 
            </span> ${habito.text}</label>
            <button class="delete" data-index=${i} id="delete${i}">Deletar</button>
            </li>  
        `;
    }).join("");
}

// Botão Check (marcar caso completado)
function checkCompleted(e) {
    if (!e.target.matches("input")) return;
    const el = e.target;
    const index = el.dataset.index;
    habitos[index].reps += 1;
    
    if(habitos[index].reps === habitos[index].totalContagem) {
        habitos[index].completed = true;
    } else if (habitos[index].reps > habitos[index].totalContagem) {
        habitos[index].reps = 0;
        habitos[index].completed = false;
    }

    listarHabitos(habitos, listaHabito);
    localStorage.setItem("habitos", JSON.stringify(habitos));
}

// Deletar Habito
function deletarHabito(e) {
    if (!e.target.matches("button")) return;
    const el = e.target;
    const index = el.dataset.index;

    habitos.splice(index, 1);

    listarHabitos(habitos, listaHabito);
    localStorage.setItem("habitos", JSON.stringify(habitos));
}

adicionarHabito.addEventListener("submit", addHabito);
listaHabito.addEventListener("click", checkCompleted);
listaHabito.addEventListener("click", deletarHabito);
listarHabitos(habitos, listaHabito);