class Formatter {
  format(status, match) {
    if (status === 'previous') {
      return this.previous(match);
    }
    if (status === 'next') {
      return this.next(match);
    }
    return 'Smth goes wrong';
  }

  static previous(match) {
    return `🏒  ${match}`;
  }

  static next(match) {
    return `🏒  ${match}`;
  }
}

export default Formatter;
