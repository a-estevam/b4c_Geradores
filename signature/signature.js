const inputNome = document.querySelector("#nome")
const inputCargo = document.querySelector("#cargo")
const inputEmail = document.querySelector("#email")
const inputCelular = document.querySelector("#celular")
const inputLocal = document.querySelector("#local")

const pegarNome = document.querySelector(".nome")
const pegarCargo = document.querySelector(".cargo")
const pegarEmail = document.querySelector(".email")
const pegarCelular = document.querySelector(".celular")
const pegarLocal = document.querySelector(".local")

const telefonesPorLocal = {
  "São Carlos": "+55 16 3501 4020",
  "São Paulo": "+55 11 4324 5305",
  "Geórgia": "+1 424 888 2942"
}


inputNome.addEventListener("input", () => {
  pegarNome.innerHTML = inputNome.value.toLocaleLowerCase()
})

inputCargo.addEventListener("input", ()=>{
    pegarCargo.innerHTML = inputCargo.value.toLocaleLowerCase()
})

inputEmail.addEventListener("input", ()=>{
    pegarEmail.innerHTML = inputEmail.value.toLocaleLowerCase()
})

inputCelular.addEventListener("input", () => {

  let valor = inputCelular.value.replace(/\D/g, "")

  
  valor = valor.slice(0, 13)

  
  let formatado = ""

  if (valor.length > 0) {
    formatado = "+55 "
  }
  if (valor.length > 2) {
    formatado += valor.slice(2, 4)
  }
  if (valor.length > 4) {
    formatado += " " + valor.slice(4, 9)
  }
  if (valor.length > 9) {
    formatado += " " + valor.slice(9, 13)
  }

  inputCelular.value = formatado
  pegarCelular.textContent = formatado
})


inputLocal.addEventListener("change", () => {
  const local = inputLocal.value

  if (local) {
    pegarLocal.textContent = telefonesPorLocal[local]
    
  }
})


const botaoCopiar = document.querySelector("#copiarAssinatura")
const assinatura = document.querySelector("#assinatura")

botaoCopiar.addEventListener("click", () => {
  const range = document.createRange()
  range.selectNodeContents(assinatura)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)

  const sucesso = document.execCommand("copy")
  selection.removeAllRanges()

  if (sucesso) {
    alert("sua assinatura foi copiada, cole no gmail")
    setTimeout(() => {
      botaoCopiar.textContent = "Copiar assinatura"
    }, 2000)
  } else {
    alert("Não foi possível copiar. Tente selecionar manualmente.")
  }
})

