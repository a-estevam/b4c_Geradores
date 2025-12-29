// Containers e layout
const containers = document.querySelectorAll(".container");
const roundCorners = document.querySelectorAll(".blue-area");

// Textos do crachá (frente e verso)
const funcionarios = document.querySelectorAll(".funcionario");
const cargos = document.querySelectorAll(".cargofunc");
const cpfs = document.querySelectorAll(".CPF");

// Inputs
const inputNome = document.querySelector("#nome");
const inputCargo = document.querySelector("#cargo");
const inputCPF = document.querySelector("#CPF");
const inputAdmissao = document.querySelector("#admisao");

// Botão
const btnAtualizar = document.querySelector("#atualizar");

// Foto
const inputFoto = document.querySelector("#uploadFoto");
const fotoPreview = document.querySelector("#fotoCracha");
const avatarCracha = document.querySelector(".avatar");

// Medidas do crachá
const crop = 5;
const width = 55;
const height = 85;
const totalWidth = crop + width + crop;
const totalHeight = crop + height + crop;
const bordas = 2;

// Configuração do grid do crachá
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

// Bordas arredondadas
roundCorners.forEach(area => {
  area.style.borderRadius = `${bordas}mm`;
});

// Upload da foto
inputFoto.addEventListener("change", event => {
  const arquivo = event.target.files[0];
  if (!arquivo) return;

  const reader = new FileReader();
  reader.onload = e => {
    fotoPreview.src = e.target.result;
    avatarCracha.src = e.target.result;
  };
  reader.readAsDataURL(arquivo);
});

// Atualizar crachá
btnAtualizar.addEventListener("click", () => {
  // Nome
  funcionarios.forEach(el => {
    el.textContent = inputNome.value.toLocaleLowerCase() || "Funcionário";
  });

  // Cargo
  cargos.forEach(el => {
    el.textContent = inputCargo.value.toLocaleLowerCase() || "Cargo";
  });

  // CPF
  cpfs.forEach(el => {
    el.textContent = inputCPF.value || "000.000.000-00";
  });

  // Data de admissão
  if (inputAdmissao.value) {
    const dataFormatada = new Date(inputAdmissao.value)
      .toLocaleDateString("pt-BR");

    document.querySelectorAll(".dataAdmissao")?.forEach(el => {
      el.textContent = dataFormatada;
    });
  }
});


// teste
// teste
// teste


const { jsPDF } = window.jspdf;

document.querySelector("#downloadPdf").addEventListener("click", async () => {
  const blueAreas = document.querySelectorAll(".blue-area");

  const largura = 5.5; // cm
  const altura = 8.5;  // cm

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "cm",
    format: [largura, altura]
  });

  for (let i = 0; i < blueAreas.length; i++) {
    const area = blueAreas[i];

    // 🔹 Clonar para não alterar o layout original
    const clone = area.cloneNode(true);
    clone.style.width = `${largura}cm`;
    clone.style.height = `${altura}cm`;
    clone.style.margin = "0";
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";

    // 🔵 CORREÇÃO DO PITÔCO
    // Pega a cor real da blue-area original
    const blueComputedColor = getComputedStyle(area).backgroundColor;

    // Força essa cor em todos os .pitoco do clone
    const pitocos = clone.querySelectorAll(".pitoco");
    pitocos.forEach(p => {
      p.style.backgroundColor = blueComputedColor;
    });

    document.body.appendChild(clone);

    // 🔹 Renderização em alta resolução (~300 DPI)
    const canvas = await html2canvas(clone, {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    if (i > 0) {
      pdf.addPage([largura, altura]);
    }

    pdf.addImage(imgData, "JPEG", 0, 0, largura, altura);
  }

  const nomeArquivo =
    (inputNome.value || "funcionario")
      .replace(/\s+/g, "_")
      .toLowerCase();

  pdf.save(`cracha_blue-area_${nomeArquivo}.pdf`);
});
