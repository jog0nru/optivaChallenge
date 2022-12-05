class GetCardsByParamsCommandBuilder {
  constructor({name, set, legality}) {
    this.name = name;
    this.set = set;
    this.legality = legality;
  }
}

module.exports = GetCardsByParamsCommandBuilder;
