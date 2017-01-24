// @flow

export class End {}
export type $End = Class<End>

export type $List<A, B: $List<any, any> | $End> = [A, B]

// convienence types for creating lists of various lengths
export type $1List<A> = $List<A, $End>
export type $2List<A, B> = $List<A, $1List<B>>
export type $3List<A, B, C> = $List<A, $2List<B, C>>
export type $4List<A, B, C, D> = $List<A, $3List<B, C, D>>
export type $5List<A, B, C, D, E> = $List<A, $4List<B, C, D, E>>
export type $6List<A, B, C, D, E, F> = $List<A, $5List<B, C, D, E, F>>

export const list1 = <A>(a: A): $1List<A> => [ a, End ];
export const list2 = <A, B>(a: A, b: B): $2List<A, B> => [ a, list1(b) ];
export const list3 = <A, B, C>(a: A, b: B, c: C): $3List<A, B, C> => [ a, list2(b, c) ];
export const list4 = <A, B, C, D>(a: A, b: B, c: C, d: D): $4List<A, B, C, D> => [ a, list3(b, c, d) ];
export const list5 = <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): $5List<A, B, C, D, E> => [ a, list4(b, c, d, e) ];
export const list6 = <A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): $6List<A, B, C, D, E, F> => [ a, list5(b, c, d, e, f) ];

// extracts the head type of a list
type $_Head<A, T: $List<A, any>> = A
type $Head<T> = $_Head<*, T>

// extracts the tail list of a list
type $_Tail<B, T: $List<any, B>> = B
type $Tail<T> = $_Tail<*, T>

// creates a union of the types in the list
type $_Union<A, B, T: $List<A, B>> = A | $Union<B>
type $Union<T> = $_Union<*, *, T>

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

type FromTupleFn =
	& (<A>(tup: [A], ..._: Array<void>) => $1List<A>)
	& (<A, B>(tup: [A, B], ..._: Array<void>) => $2List<A, B>)
	& (<A, B, C>(tup: [A, B, C], ..._: Array<void>) => $3List<A, B, C>)
	& (<A, B, C, D>(tup: [A, B, C, D], ..._: Array<void>) => $4List<A, B, C, D>)
	& (<A, B, C, D, E>(tup: [A, B, C, D, E], ..._: Array<void>) => $5List<A, B, C, D, E>)
	& (<A, B, C, D, E, F>(tup: [A, B, C, D, E, F], ..._: Array<void>) => $6List<A, B, C, D, E, F>)

export const fromTuple: FromTupleFn = (((tup) => {
	switch (tup.length) {
		case 1: {
			const [ a ] = tup;
			return list1(a);
		}

		case 2: {
			const [ a, b ] = tup;
			return list2(a, b);
		}

		case 3: {
			const [ a, b, c ] = tup;
			return list1(a, b, c);
		}

		case 4: {
			const [ a, b, c, d ] = tup;
			return list1(a, b, c, d);
		}

		case 5: {
			const [ a, b, c, d, e ] = tup;
			return list1(a, b, c, d, e);
		}

		case 6: {
			const [ a, b, c, d, e, f ] = tup;
			return list1(a, b, c, d, e, f);
		}

		default:
			throw new Error(`Expected a tuple of at least 1 and no more than 6 elements`);
	}
}: any): FromTupleFn);

type ToTupleFn =
	& (<A>(list: $1List<A>, ..._: Array<void>) => [A])
	& (<A, B>(list: $2List<A, B>, ..._: Array<void>) => [A, B])
	& (<A, B, C>(list: $3List<A, B, C>, ..._: Array<void>) => [A, B, C])
	& (<A, B, C, D>(list: $4List<A, B, C, D>, ..._: Array<void>) => [A, B, C, D])
	& (<A, B, C, D, E>(list: $5List<A, B, C, D, E>, ..._: Array<void>) => [A, B, C, D, E])
	& (<A, B, C, D, E, F>(list: $6List<A, B, C, D, E, F>, ..._: Array<void>) => [A, B, C, D, E, F])

export const toTuple: ToTupleFn = (((list) => {
	switch (list.length) {
		case 1: {
			const [ a ] = list;
			return [ a ];
		}

		case 2: {
			const [ a, [ b ] ] = list;
			return [ a, b ];
		}

		case 3: {
			const [ a, [ b, [ c ] ] ] = list;
			return [ a, b, c ];
		}

		case 4: {
			const [ a, [ b, [ c, [ d ] ] ] ] = list;
			return [ a, b, c, d ];
		}

		case 5: {
			const [ a, [ b, [ c, [ d, [ e ] ] ] ] ] = list;
			return [ a, b, c, d, e ];
		}

		case 6: {
			const [ a, [ b, [ c, [ d, [ e, [ f ] ] ] ] ] ] = list;
			return [ a, b, c, d, e, f ];
		}

		default:
			throw new Error(`Expected a list of at least 1 and no more then 8 elements`);
	}
}: any): ToTupleFn);

type $_HigherType<T, H: Higher<T>> = T
type $HigherType<H> = $_HigherType<*, H>

export class Higher<T: $List<any, any>> {}

export class HKT<K, T: $List<any, any>> {

	/**
	 * wrap :: Higher t -> HKT (Higher t) t
	 */
	static wrap<T: $List<any, any>, H: Higher<T>>(higherType: Class<H>, values: T): HKT<H, T> {
		return ((values: any): HKT<H, T>);
	}

	/**
	 * unwrap :: Class (Higher t) -> HKT (Higher t) t -> t
	 */
	static unwrap<T, H: Higher<T>>(higherType: Class<H>, hkt: HKT<H, T>): T {
		return ((hkt: any): T);
	}

}
