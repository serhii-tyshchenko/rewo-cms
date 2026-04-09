interface SequenceFunction<T> {
  (value: T): void;
}

interface Sequence {
  <T>(...fns: Array<SequenceFunction<T>>): (value: T) => void;
}

const sequence: Sequence =
  (...fns) =>
  (value) =>
    fns.forEach((fn) => fn(value));

export { sequence };
