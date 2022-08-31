import { useEffect, useState } from 'react'

function useComputed<T, V>(data: V, filter: (data: V) => T, deps: any = []): T {
	const [filtered, setFiltered] = useState<T>(data as any)

	useEffect(() => {
		setFiltered(filter(data as any))
	}, [data, ...deps]) //eslint-disable-line

	return filtered
}

export default useComputed
