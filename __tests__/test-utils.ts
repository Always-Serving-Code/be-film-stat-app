export const objectArrayToBeSortedBy = (
	objArr: object[],
	orderKey: string = 'date_added',
	order: string = "desc"
) => {
	const valueArr: any[] = [];
	let sortedArr: any;

	objArr.forEach((obj: any) => {
		const value = obj[orderKey]
		if(typeof value === 'string'){
		valueArr.push(value.toLowerCase())
		} else {
		valueArr.push(value);
		}
	});

	if (typeof valueArr[0] === "string") {
		sortedArr =
			order === "desc"
				? [...valueArr].sort().reverse()
				: (sortedArr = [...valueArr].sort());
	}

	if (typeof valueArr[0] === "number") {
		sortedArr =
			order === "desc"
				? [...valueArr].sort((a: number, b: number) => b - a)
				: [...valueArr].sort((a: number, b: number) => a - b);
	}

	for (let i = 0; i < sortedArr.length; i++) {
		if (valueArr[i] !== sortedArr[i]) {
			return false;
		}
	}
	return true;
};
