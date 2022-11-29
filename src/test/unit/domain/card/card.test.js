const Card = require('../../../../domain/card/card');
const InvalidCardError = require('../../../../domain/card/invalid-card-error');

describe('Card domain entity', () => {
  const id = 'cardId';
  const name = 'cardName';
  const language = 'en';
  const releaseDate = '2018-10-05';
  const set = 'cardSet';
  const images = ['imageUrl'];
  const legalities = ['legality'];

  it('should throw InvalidCardError if created without id', () => {
    expect(() => new Card({})).toThrow(InvalidCardError);
  });

  it('should throw InvalidCardError if created without name', () => {
    expect(() => new Card({id})).toThrow(InvalidCardError);
  });

  it('should throw InvalidCardError if created without language', () => {
    expect(() => new Card({id, name})).toThrow(InvalidCardError);
  });

  it('should create card properly', () => {
    const cardExpected = {id, name, language, releaseDate, set};
    const card = new Card({id, name, language, releaseDate, set, images, legalities});
    expect(card.toObject()).toEqual(expect.objectContaining(cardExpected));
    expect(card.toObject().images).toEqual(expect.arrayContaining(images));
    expect(card.toObject().legalities).toEqual(expect.arrayContaining(legalities));
  });
});
