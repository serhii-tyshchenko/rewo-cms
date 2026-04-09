import { makeConfig } from './make-config';

describe('makeConfig', () => {
  it('should return the value for a given key', () => {
    const config = {
      foo: 'bar',
      baz: 42,
      default: 'default value',
    };
    const getValue = makeConfig(config);
    expect(getValue('foo')).toEqual('bar');
    expect(getValue('baz')).toEqual(42);
  });

  it('should return the default value if the key is not found', () => {
    const config = {
      foo: 'bar',
      baz: 42,
      default: 'default value',
    };
    const getValue = makeConfig(config);
    expect(getValue('qux')).toEqual('default value');
  });
});
