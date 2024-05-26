export const sortAndOrderObjArr = (
	toSort: any[],
	sortBy: any = "date_watched",
	order: any = "desc"
) => {
	const sortAndOrderCompare = (sortBy: string, order: string = "desc") => {
		return function innerSort(a: any, b: any) {
			const compA =
				typeof a[sortBy] === "string" ? a[sortBy].toUpperCase() : a[sortBy];
			const compB =
				typeof b[sortBy] === "string" ? b[sortBy].toUpperCase() : b[sortBy];

			let comparison: number = 0;

			if (compA > compB) {
				comparison = -1;
			} else if (compA < compB) {
				comparison = 1;
			}
			return order === "asc" ? comparison * -1 : comparison;
		};
	};
	const sorted: any[] = [...toSort].sort(sortAndOrderCompare(sortBy, order));

	return sorted;
};
