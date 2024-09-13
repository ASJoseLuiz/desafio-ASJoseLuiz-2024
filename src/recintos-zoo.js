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

  analisaRecintos(animal, quantidade) {
    const animalsMap = this.createAnimalsMap();
    const animalData = animalsMap.find((a) => a.espécie === animal);

    if (!animalData) {
      return { erro: "Animal inválido" };
    }

    if (typeof quantidade !== "number" || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    switch (animalData.espécie) {
      case "MACACO":
        return this.paraMacaco("MACACO", quantidade, animalsMap);
      case "CROCODILO":
        return this.paraCrocodilo("CROCODILO", quantidade, animalsMap);
      case "LEAO":
        return this.paraLeao("LEAO", quantidade, animalsMap);
      case "LEOPARDO":
        return this.paraLeopardo("LEOPARDO", quantidade, animalsMap);
      case "HIPOPOTAMO":
        return this.paraHipopotamo("HIPOPOTAMO", quantidade, animalsMap);
      case "GAZELA":
        return this.paraGazela("GAZELA", quantidade, animalsMap);
      default:
        return { erro: "Espécie não reconhecida" };
    }
  }

  verificaRecinto(total, amount, calc, index) {
    if (amount + calc <= total) {
      return `Recinto ${index} (espaço livre: ${
        total - (amount + calc)
      } total: ${total})`;
    }
    return null;
  }

  paraLeopardo(animal, quantidade, animalsMap) {
    const savana = { total: 9, amount: 1, index: 5 };
    const leopardoInfo = animalsMap.find((a) => a.espécie === animal);
    const calc = quantidade * leopardoInfo.tamanho;

    const recinto = this.verificaRecinto(
      savana.total,
      savana.amount * 3,
      calc,
      savana.index
    );
    return recinto
      ? { recintosViaveis: [recinto] }
      : { erro: "Não há recinto viável" };
  }

  paraLeao(animal, quantidade, animalsMap) {
    const savana = { total: 9, amount: 1, index: 5 };
    const leaoInfo = animalsMap.find((a) => a.espécie === animal);
    const calc = quantidade * leaoInfo.tamanho;

    const recinto = this.verificaRecinto(
      savana.total,
      savana.amount * 3,
      calc,
      savana.index
    );
    return recinto
      ? { recintosViaveis: [recinto] }
      : { erro: "Não há recinto viável" };
  }

  paraGazela(animal, quantidade, animalsMap) {
    const savana = { total: 10, amount: 3, index: 1 };
    const savanaAndRio = { total: 7, amount: 1, index: 3 };
    const gazelaInfo = animalsMap.find((a) => a.espécie === animal);
    const calc = quantidade * gazelaInfo.tamanho;

    const recintosViaveis = [];
    const recintoSavana = this.verificaRecinto(
      savana.total,
      savana.amount,
      calc,
      savana.index
    );
    if (recintoSavana) recintosViaveis.push(recintoSavana);

    const recintoSavanaAndRio = this.verificaRecinto(
      savanaAndRio.total,
      savanaAndRio.amount * 2,
      calc,
      savanaAndRio.index
    );
    if (recintoSavanaAndRio) recintosViaveis.push(recintoSavanaAndRio);

    return recintosViaveis.length > 0
      ? { recintosViaveis }
      : { erro: "Não há recinto viável" };
  }

  paraMacaco(animal, quantidade, animalsMap) {
    const savana = { total: 10, amount: 3, index: 1 };
    const floresta = { total: 5, amount: 0, index: 2 };
    const savanaAndRio = { total: 7, amount: 1, index: 3 };
    const macacoInfo = animalsMap.find((a) => a.espécie === animal);
    const calc = quantidade * macacoInfo.tamanho;

    const recintosViaveis = [];
    const recintoSavana = this.verificaRecinto(
      savana.total,
      savana.amount,
      calc,
      savana.index
    );
    if (recintoSavana && !(quantidade === 1 && savana.amount === 0))
      recintosViaveis.push(recintoSavana);

    const recintoFloresta = this.verificaRecinto(
      floresta.total,
      floresta.amount,
      calc,
      floresta.index
    );
    if (recintoFloresta && !(quantidade === 1 && floresta.amount === 0))
      recintosViaveis.push(recintoFloresta);

    const recintoSavanaAndRio = this.verificaRecinto(
      savanaAndRio.total,
      savanaAndRio.amount + 2,
      calc,
      savanaAndRio.index
    );
    if (recintoSavanaAndRio) recintosViaveis.push(recintoSavanaAndRio);

    return recintosViaveis.length > 0
      ? { recintosViaveis }
      : { erro: "Não há recinto viável" };
  }

  paraCrocodilo(animal, quantidade, animalsMap) {
    const rio = { total: 8, amount: 0, index: 4 };
    const crocodiloInfo = animalsMap.find((a) => a.espécie === animal);

    if (!crocodiloInfo) {
      return { erro: "Animal inválido" };
    }

    const calc = quantidade * crocodiloInfo.tamanho;

    const recinto = this.verificaRecinto(
      rio.total,
      rio.amount,
      calc,
      rio.index
    );
    return recinto
      ? { recintosViaveis: [recinto] }
      : { erro: "Não há recinto viável" };
  }

  paraHipopotamo(animal, quantidade, animalsMap) {
    const savanaAndRio = { total: 7, amount: 1, index: 3 };
    const hipopotamoInfo = animalsMap.find((a) => a.espécie === animal);
    const calc = quantidade * hipopotamoInfo.tamanho;

    const recinto = this.verificaRecinto(
      savanaAndRio.total,
      savanaAndRio.amount * 2,
      calc,
      savanaAndRio.index
    );
    return recinto
      ? { recintosViaveis: [recinto] }
      : { erro: "Não há recinto viável" };
  }
}

export { RecintosZoo as RecintosZoo };
