class Formatter {
  constructor() {
    this.match = null;
  }

  format(status, match) {
    this.match = match;

    if (status === 'Previous' && this.match.score) {
      return this.previous();
    }

    if (status === 'Next') {
      return this.next();
    }

    return 'Smth goes wrong';
  }

  previous() {
    return `🏒  ${this.match}`;
  }

  next() {
    return `🏒  ${this.match}`;
  }
}

export default Formatter;
