class Processor {
  constructor() {
    this.info = null;
  }

  async sumInfo(match, formatter, status) {
    this.info = await match.fetchInfo(status);
    return formatter.format(status, this.info);
  }
}

module.exports = Processor;
