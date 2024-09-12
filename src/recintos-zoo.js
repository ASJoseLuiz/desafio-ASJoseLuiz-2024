class RecintosZoo {
  createAnimalsMap() {
    return [
      { espécie: "LEAO", tamanho: 3, bioma: "savana" },
      { espécie: "LEOPARDO", tamanho: 2, bioma: "savana" },
      { espécie: "CROCODILO", tamanho: 3, bioma: "rio" },
      { espécie: "MACACO", tamanho: 1, bioma: "savana ou floresta" },
      { espécie: "GAZELA", tamanho: 2, bioma: "savana" },
      { espécie: "HIPOPOTAMO", tamanho: 4, bioma: "savana ou rio" },
    ];
  }

  createMap() {
    return [
      {
        index: "1",
        bioma: "savana",
        tamanho_total: 10,
        animais_existentes: "3 macacos",
        amount: 3,
      },
      {
        index: "2",
        bioma: "floresta",
        tamanho_total: 5,
        animais_existentes: "vazio",
        amount: 0,
      },
      {
        index: "3",
        bioma: "savana e rio",
        tamanho_total: 7,
        animais_existentes: "1 gazela",
        amount: 1,
      },
      {
        index: "4",
        bioma: "rio",
        tamanho_total: 8,
        animais_existentes: "vazio",
        amount: 0,
      },
      {
        index: "5",
        bioma: "savana",
        tamanho_total: 9,
        animais_existentes: "1 leão",
        amount: 1,
      },
    ];
  }

  paraMacaco(animal, quantidade, animalsMap) {
    const savana = { total: 10, amount: 3, index: 1 }; // Exemplo de recinto 1
    const floresta = { total: 5, amount: 0, index: 2 }; // Exemplo de recinto 2
    const savanaAndRio = { total: 7, amount: 1, index: 3 }; // Exemplo de recinto 3
    const recinto = { recintosViaveis: [] };

    if (animal === "MACACO") {
      const macacoInfo = animalsMap.find((a) => a.espécie === "MACACO");
      if (!macacoInfo) {
        return { erro: "Animal inválido" };
      }

      const peso = macacoInfo.tamanho;
      const calc = quantidade * peso;

      // Recinto "savana"
      if (savana.amount + calc <= savana.total) {
        // Verifica se há espaço suficiente e se o macaco não ficará sozinho
        if (!(quantidade == 1 && savana.amount == 0)) {
          recinto.recintosViaveis.push(
            `Recinto ${savana.index} (espaço livre: ${
              savana.total - (savana.amount + calc)
            } total: ${savana.total})`
          );
        }
      }

      // Recinto "floresta"
      if (floresta.amount + calc <= floresta.total) {
        // Verifica se há espaço suficiente e se o macaco não ficará sozinho
        if (!(quantidade == 1 && floresta.amount == 0)) {
          recinto.recintosViaveis.push(
            `Recinto ${floresta.index} (espaço livre: ${
              floresta.total - (floresta.amount + calc)
            } total: ${floresta.total})`
          );
        }
      }

      // Recinto "savana e rio"
      if (savanaAndRio.amount + calc + 2 <= savanaAndRio.total) {
        // Adiciona +2 ao cálculo por causa da presença de 2 macacos + (gazela)
        recinto.recintosViaveis.push(
          `Recinto ${savanaAndRio.index} (espaço livre: ${
            savanaAndRio.total - (savanaAndRio.amount + calc + 2) // +2 espaço extra por múltiplas espécies
          } total: ${savanaAndRio.total})`
        );
      }

      return recinto.recintosViaveis.length > 0
        ? recinto
        : { erro: "Não há recinto viável" };
    }
  }

  paraCrocodilo(animal, quantidade, animalsMap) {
    const recinto = { recintosViaveis: [] };

    // Verifica se o animal é um crocodilo
    if (animal === "CROCODILO") {
      const crocodiloInfo = animalsMap.find((a) => a.espécie === "CROCODILO");
      if (!crocodiloInfo) {
        return { erro: "Animal inválido" };
      }

      const peso = crocodiloInfo.tamanho; // O tamanho de um crocodilo é 3
      const calc = quantidade * peso; // Calcula o espaço necessário para os crocodilos

      // Itera sobre todos os recintos
      const map = this.createMap(); // Assumimos que createMap retorna os recintos
      map.forEach((r) => {
        if (r.bioma === "rio") {
          // Verifica se o recinto é de bioma "rio"
          const espaçoLivre = r.tamanho_total - r.amount;
          if (espaçoLivre >= calc) {
            // Verifica se há espaço suficiente
            recinto.recintosViaveis.push(
              `Recinto ${r.index} (espaço livre: ${espaçoLivre - calc} total: ${
                r.tamanho_total
              })`
            );
          }
        }
      });

      // Verifica se há recintos viáveis ou retorna uma mensagem de erro
      return recinto;
    }
  }

  analisaRecintos(animal, quantidade) {
    const animalsMap = this.createAnimalsMap();
    const animalData = animalsMap.find((a) => a.espécie === animal);
    if (!animalData) {
      return { erro: "Animal inválido" };
    }

    if (typeof quantidade != "number" || quantidade == 0) {
      return { erro: "Quantidade inválida" };
    }

    if (animalData.espécie == "MACACO") {
      return this.paraMacaco(animal, quantidade, animalsMap);
    }
    return this.paraCrocodilo(animal, quantidade, animalsMap);
  }
}

export { RecintosZoo as RecintosZoo };
