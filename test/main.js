// @flow
import type { $List, $End, $Head, $Tail, $1List, $2List, $3List, $4List, $5List, $6List, $Union } from '../src/main';
import { End, HigherKind, unwrap, wrap } from '../src/main';
import test from 'tape';

test('Higher', t => {
	t.plan(1);

	class A_Kind extends HigherKind<$1List<number>> {}

	let a = 42,
		hkt_a = wrap(A_Kind, [ a, End ]);

	t.deepEqual(unwrap(A_Kind, hkt_a), [ a, End ]);
});

([ 'tim', End ]: $1List<string>);
([ 'tim', [ 29, End ] ]: $2List<string, number>);
([ 'tim', [ 29, [ true, End ] ] ]: $3List<string, number, bool>);

let a: $2List<string, number> = [ 'tim', [ 29, End ] ];

if (false) {
	// 1 type
	(['tim', End]: $List<string, $End>);
	// $FlowFixMe
	(['tim', End]: $List<number, $End>);
	(['tim', End]: $1List<string>);
	// $FlowFixMe
	(['tim', End]: $1List<number>);
	('tim': $Head<$1List<string>>);
	(End: $Tail<$1List<string>>);

	// 2 types
	(['tim', [29, End]]: $List<string, $List<number, $End>>);
	// $FlowFixMe
	(['tim', [29, End]]: $List<string, $List<string, $End>>);
	(['tim', [29, End]]: $2List<string, number>);
	// $FlowFixMe
	(['tim', [true, End]]: $2List<string, number>);
	('tim': $Head<$2List<string, number>>);
	([29, End]: $Tail<$2List<string, number>>);

	// 3 types
	(['tim', [29, [true, End]]]: $List<string, $List<number, $List<bool, $End>>>);
	// $FlowFixMe
	(['tim', [29, [42, End]]]: $List<string, $List<number, $List<bool, $End>>>);
	(['tim', [29, [true, End]]]: $3List<string, number, bool>);
	// $FlowFixMe
	(['tim', [29, [42, End]]]: $3List<string, number, bool>);
	('tim': $Head<$3List<string, number, bool>>);
	([29, [true, End]]: $Tail<$3List<string, number, bool>>);
	// $FlowFixMe
	([29, [42, End]]: $Tail<$3List<string, number, bool>>);

	// 4 types
	(['tim', [29, [true, ['bar', End]]]]: $List<string, $List<number, $List<bool, $List<string, $End>>>>);
	// $FlowFixMe
	(['tim', [29, [true, [42, End]]]]: $List<string, $List<number, $List<bool, $List<string, $End>>>>);
	(['tim', [29, [true, ['bar', End]]]]: $4List<string, number, bool, string>);
	// $FlowFixMe
	(['tim', [29, [true, [42, End]]]]: $4List<string, number, bool, string>);
	('tim': $Head<$4List<string, number, bool, string>>);
	([29, [true, ['bar', End]]]: $Tail<$4List<string, number, bool, string>>);
	// $FlowFixMe
	([29, [true, [42, End]]]: $Tail<$4List<string, number, bool, string>>);

	// 5 types
	(['tim', [29, [true, ['bar', [true, End]]]]]: $List<string, $List<number, $List<bool, $List<string, $List<bool, $End>>>>>);
	// $FlowFixMe
	(['tim', [29, [true, ['bar', [42, End]]]]]: $List<string, $List<number, $List<bool, $List<string, $List<bool, $End>>>>>);
	(['tim', [29, [true, ['bar', [true, End]]]]]: $5List<string, number, bool, string, bool>);
	// $FlowFixMe
	(['tim', [29, [true, ['bar', [42, End]]]]]: $5List<string, number, bool, string, bool>);
	('tim': $Head<$5List<string, number, bool, string, bool>>);
	([29, [true, ['bar', [true, End]]]]: $Tail<$5List<string, number, bool, string, bool>>);
	// $FlowFixMe
	([29, [true, ['bar', [42, End]]]]: $Tail<$5List<string, number, bool, string, bool>>);

	// 6 types
	(['tim', [29, [true, ['bar', [true, [42, End]]]]]]: $List<string, $List<number, $List<bool, $List<string, $List<bool, $List<number, $End>>>>>>);
	// $FlowFixMe
	(['tim', [29, [true, ['bar', [true, ['foo', End]]]]]]: $List<string, $List<number, $List<bool, $List<string, $List<bool, $List<number, $End>>>>>>);
	(['tim', [29, [true, ['bar', [true, [42, End]]]]]]: $6List<string, number, bool, string, bool, number>);
	// $FlowFixMe
	(['tim', [29, [true, ['bar', [true, ['foo', End]]]]]]: $6List<string, number, bool, string, bool, number>);
	('tim': $Head<$6List<string, number, bool, string, bool, number>>);
	([29, [true, ['bar', [true, [42, End]]]]]: $Tail<$6List<string, number, bool, string, bool, number>>);
	// $FlowFixMe
	([29, [true, ['bar', [true, ['foo', End]]]]]: $Tail<$6List<string, number, bool, string, bool, number>>);

	// union
	('tim': $Union<$2List<string, number>>);
	(42: $Union<$2List<string, number>>);
	// $FlowFixMe
	(true: $Union<$2List<string, number>>);
}
