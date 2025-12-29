const containers = document.querySelectorAll(".container");
const roundConers = document.querySelectorAll(".blue-area");
let colaborador = document.querySelector(".funcionario");
let cargo = document.querySelector(".cargofunc");
const nameUser = document.querySelector("#nome");
const cargoUser = document.querySelector("#cargo");
const btnAtualizar = document.querySelector("#atualizar");
const inputFoto = document.querySelector("#uploadFoto");
const fotoPreview = document.querySelector("#fotoCracha");
const avatarCracha = document.querySelector(".avatar"); // <- imagem dentro do crachá

const crop = 5;
const width = 55;
const height = 85;
const totalWidth = crop + width + crop;
const totalHeight = crop + height + crop;
const bordas = 2;

containers.forEach(container => {
  container.style.width = totalWidth + "mm";
  container.style.height = totalHeight + "mm";
  container.style.gridTemplateColumns = `${crop}mm ${width}mm ${crop}mm`;
  container.style.gridTemplateRows = `${crop}mm ${height}mm ${crop}mm`;

  const corners = container.querySelectorAll(".corner");
  corners.forEach(corner => {
    corner.style.width = crop + "mm";
    corner.style.height = crop + "mm";
  });
});

roundConers.forEach(roundConer =>{
  roundConer.style.borderRadius = `${bordas}mm`
});

// Upload da foto
inputFoto.addEventListener("change", (event) => {
  const arquivo = event.target.files[0];
  if (arquivo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fotoPreview.src = e.target.result;   // mostra preview do lado do form
      avatarCracha.src = e.target.result;  // troca a foto dentro do crachá
    };
    reader.readAsDataURL(arquivo);
  }
});

// Atualiza crachá
function atualizaCracha(){
  btnAtualizar.addEventListener("click", () =>{
    colaborador.textContent = nameUser.value;
    cargo.textContent = cargoUser.value;
  });
}
atualizaCracha();
