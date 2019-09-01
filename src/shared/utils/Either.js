export const Right = x => ({
  ap: b2 => b2.map(x),
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (_f, g) => g(x),
  inspect: () => `Right(${x})`,
});

export const Left = x => ({
  ap: b2 => b2.map(x),
  chain: _f => Left(x),
  map: _f => Left(x),
  fold: (f, _g) => f(x),
  inspect: () => `Left(${x})`,
});

export const fromNullabe = x => (x ? Right(x) : Left(null));

export const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

export const of = x => Right(x);

export const ifElse = x => conditionFn => (conditionFn(x) ? Right(x) : Left(x));
