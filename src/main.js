// @flow
import { exhaust } from 'flow-helpers';

// represents the end of a type list
export class End {
	static val: empty
}
export type $End = Class<End>

export type $List<A, B: $End | $List<any, any>> = { head: A, tail: B }

export type $Head<T: $List<any, any>> = $PropertyType<T, 'head'>
export type $Tail<T: $List<any, any>> = $PropertyType<T, 'tail'>

export type $T1<T> = $Head<T>
export type $T2<T> = $Head<$Tail<T>>
export type $T3<T> = $Head<$Tail<$Tail<T>>>
export type $T4<T> = $Head<$Tail<$Tail<$Tail<T>>>>
export type $T5<T> = $Head<$Tail<$Tail<$Tail<$Tail<T>>>>>
export type $T6<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>
export type $T7<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>>
export type $T8<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>>>

type $_Union<A, B, T: $List<A, B>> = A | $_Union<*, *, B>
export type $Union<T: $List<any, any>> = $_Union<*, *, T>

type $_Intersect<A, B, T: $List<A, B>> = A & $_Intersect<*, *, B>
export type $Intersect<T: $List<any, any>> = $_Intersect<*, *, T>

export type $List1<A> = $List<A, $End>
export type $List2<A, B> = $List<A, $List1<B>>
export type $List3<A, B, C> = $List<A, $List2<B, C>>
export type $List4<A, B, C, D> = $List<A, $List3<B, C, D>>
export type $List5<A, B, C, D, E> = $List<A, $List4<B, C, D, E>>
export type $List6<A, B, C, D, E, F> = $List<A, $List5<B, C, D, E, F>>
export type $List7<A, B, C, D, E, F, G> = $List<A, $List6<B, C, D, E, F, G>>
export type $List8<A, B, C, D, E, F, G, H> = $List<A, $List7<B, C, D, E, F, G, H>>

//
export const list1 = <A>(a: A): $List1<A> => ({ head: a, tail: End });
export const list2 = <A, B>(a: A, b: B): $List2<A, B> => ({ head: a, tail: list1(b) });
export const list3 = <A, B, C>(a: A, b: B, c: C): $List3<A, B, C> => ({ head: a, tail: list2(b, c) });
export const list4 = <A, B, C, D>(a: A, b: B, c: C, d: D): $List4<A, B, C, D> => ({ head: a, tail: list3(b, c, d) });
export const list5 = <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): $List5<A, B, C, D, E> => ({ head: a, tail: list4(b, c, d, e) });
export const list6 = <A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): $List6<A, B, C, D, E, F> => ({ head: a, tail: list5(b, c, d, e, f) });
export const list7 = <A, B, C, D, E, F, G>(a: A, b: B, c: C, d: D, e: E, f: F, g: G): $List7<A, B, C, D, E, F, G> => ({ head: a, tail: list6(b, c, d, e, f, g) });
export const list8 = <A, B, C, D, E, F, G, H>(a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): $List8<A, B, C, D, E, F, G, H> => ({ head: a, tail: list7(b, c, d, e, f, g, h) });

// type ListFn =
// 	& (<A, B, C, D>(a: A, b: B, c: C, d: D) => $List3<A, B, C, D>)
// 	& (<A, B, C>(a: A, b: B, c: C) => $List3<A, B, C>)
// 	& (<A, B>(a: A, B) => $List2<A, B>)
// 	& (<A>(a: A) => $List1<A>)


	// & (<A, B, C, D>(a: A, b: B, c: C, d: D) => $List4<A, B, C, D>)
	// & (<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E) => $List5<A, B, C, D, E>)
	// & (<A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E) => $List6<A, B, C, D, E, F>)
	// & (<A, B, C, D, E, F, G>(a: A, b: B, c: C, d: D, e: E) => $List7<A, B, C, D, E, F, G>)
	// & (<A, B, C, D, E, F, G, H>(a: A, b: B, c: C, d: D, e: E) => $List8<A, B, C, D, E, F, G, H>)
/*
export const list: ListFn = (a, b, c, d) => {

	if (d == null) {

	}
	else {
		return {
			head: a,
			tail: {
				head: b,
				tail: {
					head: c,
					tail: {
						head: d,
						tail: End
					}
				}
			}
		};
	}

	switch (args.length) {
		case 1: {
			let [ a ] = args;
			return {
				head: a,
				tail: End
			};
		}

		case 2: {
			let [ a, b, ...tail ] = args;
			return {
				head: a,
				tail: {
					head: b,
					tail: End
				}
			};
		}

		case 3: {
			let [ a, b, c, ...tail ] = args;
			return {
				head: a,
				tail: {
					head: b,
					tail: {
						head: c,
						tail: End
					}
				}
			};
		}

		case 4:
			return {};

		default: {
			throw new TypeError();
		}
	}
};
*/

export const fromT1 = <A>(t: $List1<A>): A => t.head;
export const fromT2 = <A, B>(t: $List2<A, B>): [A, B] => [ t.head, t.tail.head ];
export const fromT3 = <A, B, C>(t: $List3<A, B, C>): [A, B, C] => [ t.head, t.tail.head, t.tail.tail.head ];
export const fromT4 = <A, B, C, D>(t: $List4<A, B, C, D>): [A, B, C, D] => [ t.head, t.tail.head, t.tail.tail.head, t.tail.tail.tail.head ];
export const fromT5 = <A, B, C, D, E>(t: $List5<A, B, C, D, E>): [A, B, C, D, E] => [ t.head, t.tail.head, t.tail.tail.head, t.tail.tail.tail.head, t.tail.tail.tail.tail.head ];
export const fromT6 = <A, B, C, D, E, F>(t: $List6<A, B, C, D, E, F>): [A, B, C, D, E, F] => [ t.head, t.tail.head, t.tail.tail.head, t.tail.tail.tail.head, t.tail.tail.tail.tail.head, t.tail.tail.tail.tail.tail.head ];
export const fromT7 = <A, B, C, D, E, F, G>(t: $List7<A, B, C, D, E, F, G>): [A, B, C, D, E, F, G] => [ t.head, t.tail.head, t.tail.tail.head, t.tail.tail.tail.head, t.tail.tail.tail.tail.head, t.tail.tail.tail.tail.tail.head, t.tail.tail.tail.tail.tail.tail.head ];
export const fromT8 = <A, B, C, D, E, F, G, H>(t: $List8<A, B, C, D, E, F, G, H>): [A, B, C, D, E, F, G, H] => [ t.head, t.tail.head, t.tail.tail.head, t.tail.tail.tail.head, t.tail.tail.tail.tail.head, t.tail.tail.tail.tail.tail.head, t.tail.tail.tail.tail.tail.tail.head, t.tail.tail.tail.tail.tail.tail.tail.head ];

export class HKT<K, T: $List<any, any>> {

	/**
	 * wrap :: Class k -> t -> HKT k t
	 */
	static wrap<K, I, T: $List<any, any>>(kind: Class<K>, value: T): HKT<K, T> {
		return ((value: any): HKT<K, T>);
	}

	/**
	 * unwrap :: HKT k t ~> t
	 */
	static unwrap<K, T: $List<any, any>>(kind: Class<K>, value: HKT<K, T>): T {
		return ((value: any): T);
	}

}
