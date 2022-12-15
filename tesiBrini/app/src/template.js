export default {
	data : {
		plant: [{
			name: "LAI",
			type: "range",
			default: "0",
			values: [0, 10],
			scale: "linear",
			mandatory: "true"
		}, {
			name: "Root shape",
			type: "radiogroup",
			default: "0",
			values: [
				"https://media.istockphoto.com/id/817203414/it/vettoriale/insieme-di-radici-degli-alberi.jpg?s=612x612&w=is&k=20&c=z9osf8fG3NMgrPxu7UVNcPFdoEftG-86gb9X2cbJyxM=",
				"https://media.istockphoto.com/id/817203414/it/vettoriale/insieme-di-radici-degli-alberi.jpg?s=612x612&w=is&k=20&c=z9osf8fG3NMgrPxu7UVNcPFdoEftG-86gb9X2cbJyxM="
			],
			mandatory: "true"
		}],
		soil: [{
			name: "ksat",
			type: "range",
			default: "0.5",
			values: [0.1, 10],
			scale: "logarithmic",
			mandatory: "false",
			hyperparopt: "true"
		}],
	}
}
