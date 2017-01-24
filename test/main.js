// @flow
import { HKT, list1, fromT1 } from '../src/main';
import test from 'tape';

test('HKT', t => {
	t.plan(1);

	class A_Kind {}

	let a = 42,
		hkt_a = HKT.wrap(A_Kind, list1(a))

	t.equal(fromT1(HKT.unwrap(A_Kind, hkt_a)), a);
});
