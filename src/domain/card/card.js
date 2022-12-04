const InvalidCardError = require('./invalid-card-error');

class Card {
  constructor(
      {id, name, language, releaseDate, images, set, legalities},
  ) {
    this.id = id;
    this.name = name;
    this.language = language;
    this.releaseDate = releaseDate;
    this.images = images;
    this.set = set;
    this.legalities = legalities;
  }

  set id(id) {
    if (!id || typeof id !== 'string') {
      throw new InvalidCardError('Field id cannot be set to empty');
    }
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set name(name) {
    if (!name || typeof name !== 'string') {
      throw new InvalidCardError('Field name shuld be a string and cannot be set to empty');
    }
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set language(language) {
    if (!language || typeof language !== 'string') {
      throw new InvalidCardError('Field language should be a string and cannot be set to empty');
    }
    this._language = language;
  }

  get language() {
    return this._language;
  }

  set releaseDate(releaseDate) {
    if (!releaseDate || typeof releaseDate !== 'string') {
      throw new InvalidCardError('Field releaseDate should be a string and cannot be set to empty');
    }
    this._releaseDate = releaseDate;
  }

  get releaseDate() {
    return this._releaseDate;
  }

  set images(images) {
    if (!images || typeof images !== 'object') {
      throw new InvalidCardError('Field images should be an array and cannot be set to empty');
    }
    this._images = images;
  }

  get images() {
    return this._images;
  }

  set set(set) {
    if (!set || typeof set !== 'string') {
      throw new InvalidCardError('Field set should be a string and cannot be set to empty');
    }
    this._set = set;
  }

  get set() {
    return this._set;
  }

  set legalities(legalities) {
    if (!legalities || typeof legalities !== 'object') {
      throw new InvalidCardError('Field legalities should be an array and cannot be set to empty');
    }
    this._legalities = legalities;
  }

  get legalities() {
    return this._legalities;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      language: this.language,
      releaseDate: this.releaseDate,
      images: this.images,
      set: this.set,
      legalities: this.legalities,
    };
  }
}

module.exports = Card;
