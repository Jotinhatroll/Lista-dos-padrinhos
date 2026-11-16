let presenteAtual = "";
    let presentePixAtual = "";
    const chavePix = "16981492681";

    function organizarPresentesEscolhidos() {
      document.querySelectorAll(".galeria").forEach((galeria) => {
        const presentes = Array.from(galeria.children).filter((item) =>
          item.classList.contains("presente")
        );

        presentes
          .sort((a, b) =>
            Number(a.classList.contains("presente-escolhido")) -
            Number(b.classList.contains("presente-escolhido"))
          )
          .forEach((presente) => galeria.appendChild(presente));
      });
    }

    organizarPresentesEscolhidos();


    function abrirModal(presente) {

      presenteAtual = presente;

      document.getElementById(
        "presenteSelecionado"
      ).innerText =
        "Você escolheu: " + presente;

      document.getElementById(
        "nomePessoa"
      ).value = "";

      document.getElementById(
        "modal"
      ).classList.add("aberto");

      document.getElementById(
        "nomePessoa"
      ).focus();

    }


    function fecharModal() {

      document.getElementById(
        "modal"
      ).classList.remove("aberto");

    }


    function abrirPix(presente) {

      presentePixAtual = presente;

      document.getElementById(
        "presentePixSelecionado"
      ).innerText = "Presente ou contribuição: " + presente;

      document.getElementById("nomePagadorPix").value = "";
      document.getElementById("valorPagadorPix").value = "";
      document.getElementById("pixFeedback").innerText = "";

      document.getElementById(
        "modalPix"
      ).classList.add("aberto");

    }


    function fecharModalPix() {

      document.getElementById(
        "modalPix"
      ).classList.remove("aberto");

    }


    async function copiarChavePix() {

      const feedback = document.getElementById("pixFeedback");

      try {

        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(chavePix);
        } else {
          const campoTemporario = document.createElement("textarea");
          campoTemporario.value = chavePix;
          campoTemporario.style.position = "fixed";
          campoTemporario.style.opacity = "0";
          document.body.appendChild(campoTemporario);
          campoTemporario.select();
          document.execCommand("copy");
          campoTemporario.remove();
        }

        feedback.innerText = "Chave Pix copiada.";

      } catch (erro) {

        feedback.innerText = "Não foi possível copiar. Selecione a chave acima.";

      }

    }


    async function copiarEndereco() {

      const feedback = document.getElementById("enderecoFeedback");
      const endereco = document.getElementById("texto-endereco-entrega").innerText.trim();
      const referencia = document.querySelector(".endereco-entrega p").innerText.trim();
      const texto = `${endereco}\n${referencia}`;

      try {

        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(texto);
        } else {
          const campoTemporario = document.createElement("textarea");
          campoTemporario.value = texto;
          campoTemporario.style.position = "fixed";
          campoTemporario.style.opacity = "0";
          document.body.appendChild(campoTemporario);
          campoTemporario.select();
          const copiado = document.execCommand("copy");
          campoTemporario.remove();

          if (!copiado) throw new Error("A cópia foi recusada pelo navegador.");
        }

        feedback.innerText = "Endereço copiado.";

      } catch (erro) {

        feedback.innerText = "Não foi possível copiar o endereço.";

      }

    }


    function avisarPagamentoPix() {

      const nome = document
        .getElementById("nomePagadorPix")
        .value
        .trim();

      if (nome === "") {
        alert("Digite seu nome para avisar os noivos. ❤️");
        return;
      }

      const valor = document.getElementById("valorPagadorPix").value;
      const linhaValor = valor
        ? `\nValor informado: R$ ${Number(valor).toFixed(2).replace(".", ",")}`
        : "";

      const mensagem =
        `Olá! Fiz um Pix para: ${presentePixAtual}.${linhaValor}\n` +
        `Meu nome: ${nome}. Por favor, confirmem o recebimento. ❤️`;

      const url =
        "https://wa.me/5516981492681?text=" +
        encodeURIComponent(mensagem);

      window.open(url, "_blank");
      fecharModalPix();

    }


    
function confirmarPresente() {
  const nome = document.getElementById("nomePessoa").value.trim();

  if (!nome) {
    alert("Por favor, digite seu nome. ❤️");
    return;
  }

  const mensagem =
    `Olá, noivos! ❤️\n\n` +
    `Gostaria de confirmar minha escolha de presente:\n\n` +
    `🎁 Presente: ${presenteAtual}\n` +
    `👤 Meu nome: ${nome}\n\n` +
    `Estou confirmando minha escolha na lista de presentes. ❤️`;

  const telefone = "5516981492681";

  const url =
    `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

  fecharModal();
}


    /* Fechar clicando fora */

    document
      .getElementById("modal")
      .addEventListener(
        "click",
        function(event) {

          if (
            event.target === this
          ) {

            fecharModal();

          }

        }
      );


    document
      .getElementById("modalPix")
      .addEventListener(
        "click",
        function(event) {

          if (event.target === this) {
            fecharModalPix();
          }

        }
      );


    /* Fechar com ESC */

    document.addEventListener(
      "keydown",
      function(event) {

        if (
          event.key === "Escape"
        ) {

          fecharModal();
          fecharModalPix();

        }

      }
    );
// Eventos da página ficam centralizados neste arquivo.
document.addEventListener("click", (event) => {
  const botao = event.target.closest("[data-action]");
  if (!botao) return;

  const presente = botao.dataset.item;
  const acoes = {
    "choose-gift": () => abrirModal(presente),
    "pay-pix": () => abrirPix(presente),
    "confirm-gift": confirmarPresente,
    "close-gift-modal": fecharModal,
    "copy-pix-key": copiarChavePix,
    "copy-address": copiarEndereco,
    "notify-pix": avisarPagamentoPix,
    "close-pix-modal": fecharModalPix,
  };

  acoes[botao.dataset.action]?.();
});
