const uppercase: () => 
	( text: string, render: any ) => any =
	() => {
		return ( text, render ) => {
			return render( text ).toUpperCase();
		};
	};

const lowercase: () => 
	( text: string, render: any ) => any =
	() => {
		return ( text, render ) => {
			return render(text).toLowerCase();
		};
	};

const capitalize: () => 
	( text: string, render: any ) => any =
	() => {
		return ( text, render ) => {
			return render( text ).charAt(0).toUpperCase() + render( text ).slice(1).toLowerCase();
		};
	};

export default {
	uppercase,
	lowercase,
	capitalize
};