// @flow
import type { $1List, $2List, $3List } from '../src/main';
import { Higher, HKT, fromTuple, toTuple, list1, list2, list3 } from '../src/main';
import test from 'tape';

test('HKT', t => {
	t.plan(1);

	class A_Kind extends Higher<$1List<number>> {}

	let a = 42,
		hkt_a = HKT.wrap(A_Kind, list1(a))

	t.equal(toTuple(HKT.unwrap(A_Kind, hkt_a)), a);
});

(list1('tim'): $1List<string>);
(list2('tim', 29): $2List<string, string>);
(list3('tim', 29, 32): $3List<string, number, bool>);
