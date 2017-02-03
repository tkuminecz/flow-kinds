# flow-higher

Higher-kinded types for Flow

## Defining Types

Extending the `HigherType` class to define new higher-kinded types.

## API

#### `type $List<Head, Tail>`

A list of types. `Head` is the first type in the list, and `Tail` is either `$End` or another `$List`.

```javascript
import { type $List } from 'flow-higher';
```

#### `type $End`

The end of a `$List`. The only value of type `$End` is `End`.

```javascript
import { type $End, End } from 'flow-higher';
```

#### `type $Head<List>`

The head type of the given `$List`.

```javascript
import type { $List, $End, $Head } from 'flow-higher';

type TList = $List<string, $List<number, $End>>

// extract the head (ie the first element)
('foo': $Head<TList>); // OK
```

#### `type $Tail<List>`

The tail of the given `$List`. Either another `$List` or `$End`.

```javascript
import type { $List, $End, $Head, $Tail } from 'flow-higher';
import { End } from 'flow-higher';

type TList = $List<string, $List<number, $End>>

// extract the tail list
([ 42, End ]: $Tail<TList>); // OK

// extract the head of the tail list (ie the 2nd element)
(42: $Head<$Tail<TList>>); // OK
```

#### `type $ListOf1<A>`
#### `type $ListOf2<A, B>`
#### `type $ListOf3<A, B, C>`
#### `type $ListOf4<A, B, C, D>`
#### `type $ListOf5<A, B, C, D, E>`
#### `type $ListOf6<A, B, C, D, E, F>`

Convenience types for `$List`s of up to six types.

```javascript
import type { $1list, $2List, $3list } from 'flow-higher';
```

### `class HigherType<Kind, Signature, Data>`

Defines a new higher-kinded type.

```javascript
import { type $2Types, Type } from 'flow-higher';

class IsPair {}

export class Pair<A, B> extends Type<IsPair, $2Types<A, B>, [A, B]> {

  static Both<A, B>(a: A, b: B): Pair<A, B> {
    return Pair._wrap(IsPair, [a, b]);
  }

}
```

### `HigherType.wrap(kind, value)`

Takes a class as the kind and a compatible value and returns a `HigherType` instance.

### `HigherType.unwrap(kind, wrappedValue)`

Takes a class as the kind and a compatible `HigherType` instance and returns the contained value.
