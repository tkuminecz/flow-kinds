// @flow

export class End {}
export type $End = Class<End>

export type $List<H, T: $End | $List<any, any>> = [H, T]

export type $Types<H, T: $End | $Types<any, any>> = $List<H, T>

// lists of n types
export type $ListOf1<A> = $List<A, $End>
export type $ListOf2<A, B> = $List<A, $ListOf1<B>>
export type $ListOf3<A, B, C> = $List<A, $ListOf2<B, C>>
export type $ListOf4<A, B, C, D> = $List<A, $ListOf3<B, C, D>>
export type $ListOf5<A, B, C, D, E> = $List<A, $ListOf4<B, C, D, E>>
export type $ListOf6<A, B, C, D, E, F> = $List<A, $ListOf5<B, C, D, E, F>>

export type $1Type<A> = $ListOf1<A>
export type $2Types<A, B> = $ListOf2<A, B>
export type $3Types<A, B, C> = $ListOf3<A, B, C>
export type $4Types<A, B, C, D> = $ListOf4<A, B, C, D>
export type $5Types<A, B, C, D, E> = $ListOf5<A, B, C, D, E>
export type $6Types<A, B, C, D, E, F> = $ListOf6<A, B, C, D, E, F>

export type $Empty = $1Type<empty>
export type $Unit = $Empty

type $_Head<H, L: $List<H, any>> = H // eslint-disable-line no-unused-vars
export type $Head<L> = $_Head<*, L>

type $_Tail<T, L: $List<any, T>> = T // eslint-disable-line no-unused-vars
export type $Tail<L> = $_Tail<*, L>

// access the nth type in a list
export type $1<L> = $Head<L>
export type $2<L> = $Head<$Tail<L>>
export type $3<L> = $Head<$Tail<$Tail<L>>>
export type $4<L> = $Head<$Tail<$Tail<$Tail<L>>>>
export type $6<L> = $Head<$Tail<$Tail<$Tail<$Tail<L>>>>>
export type $5<L> = $Head<$Tail<$Tail<$Tail<$Tail<L>>>>>

export type $A<L> = $1<L>
export type $B<L> = $2<L>
export type $C<L> = $3<L>
export type $D<L> = $4<L>
export type $E<L> = $5<L>
export type $F<L> = $6<L>

// swap types in the nth position of a list
export type $SwapA<T, A2> = $List<A2, $Tail<T>>
export type $SwapB<T, B2> = $List<$A<T>, $List<B2, $Tail<$Tail<T>>>>
export type $SwapC<T, C2> = $List<$A<T>, $List<$B<T>, $List<C2, $Tail<$Tail<$Tail<T>>>>>>
export type $SwapD<T, D2> = $List<$A<T>, $List<$B<T>, $List<$C<T>, $List<D2, $Tail<$Tail<$Tail<$Tail<T>>>>>>>>
export type $SwapE<T, E2> = $List<$A<T>, $List<$B<T>, $List<$C<T>, $List<$D<T>, $List<E2, $Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>>>>>
export type $SwapF<T, F2> = $List<$A<T>, $List<$B<T>, $List<$C<T>, $List<$D<T>, $List<$E<T>, $List<F2, $Tail<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>>>>>>>

type $_Union<A, B, L: $List<A, B>> = A | $Union<B> // eslint-disable-line no-unused-vars
export type $Union<L> = $_Union<*, *, L>

export type $Tag<Label, Data> = { tag: Label, val: $TupleMap<Data, <V>(v: V) => V> }

export type $App<K, T> = $Subtype<Type<K, T, *>>

export class Type<Kind, Types, Data> {

	/**
	 * _ :: d -> Type k t d
	 */
	static _<I: Type<Kind, Types, Data>>(data: Data): I {
		return ((data: any): I);
	}

	/**
	 * wrap :: Class k -> d -> Type k t d
	 */
	static wrap<I: Type<Kind, Types, Data>>(kind: Class<Kind>, data: Data): I {
		return ((data: any): I);
	}

	/**
	 * unwrap :: Class k -> Type k t d -> d
	 */
	static unwrap<I: Type<Kind, Types, Data>>(kind: Class<Kind>, wrapped: I): Data {
		return ((wrapped: any): Data);
	}

}
