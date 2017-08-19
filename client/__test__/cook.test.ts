import { cook, dateCooker } from '../cook';

describe('cook', () => {
  class Entity {
    date: Date;
    id: string;
    nested: NestedEntity;
    notRequiredField?: number;
  }

  // tslint:disable-next-line:max-classes-per-file
  class NestedEntity {
    id: string;
  }

  const nestedCooker: (v: string) => NestedEntity = jest
    .fn()
    .mockReturnValue({ id: '2' });

  let entity: Entity;

  const thatOneTime = new Date('2017-07-10');

  beforeEach(() => {
    entity = new Entity();

    cook(
      'Test Entity',
      entity,
      {
        date: thatOneTime.toISOString(),
        id: '1',
        nested: {
          id: '2',
        },
      },
      ['date', 'id', 'nested'],
      {
        nested: nestedCooker,
        date: dateCooker,
      }
    );
  });

  it('should assign the date', () => {
    expect(entity.date).toEqual(thatOneTime);
  });

  it('should call the nested cooker function', () => {
    expect(nestedCooker).toBeCalled();
  });

  it('should set the value of not required fields to undefined', () => {
    expect(entity.notRequiredField).toBeUndefined();
  });

  it('should throw an error if the keys are incorrect', () => {
    expect(() => {
      cook(
        'Test Entity',
        entity,
        {
          date: null,
          id: '1',
          nested: {
            id: '2',
          },
        },
        ['date', 'id', 'nested'],
        {
          nested: nestedCooker,
          date: dateCooker,
        }
      );
    }).toThrowError(TypeError);
  });
});
