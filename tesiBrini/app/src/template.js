export default {
	data : {
		"Field": [{
				"name": "Location latitude",
				"post": "lat",
				"type": "text",
				"default": "",
				"mandatory": "true"
			}, {
				"name": "Location longitude",
				"post": "lon",
				"type": "text",
				"default": "",
				"mandatory": "true"
			}, {
				"name": "Location altitude",
				"post": "z",
				"type": "text",
				"default": "",
				"mandatory": "true"
			},  {
				"name": "Horizontal field slope",
				"post": "slopeX",
				"url": "https://en.wikipedia.org/wiki/Slope",
				"type": "range",
				"default": 0,
				"values": [-10, 10],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Vertical field slope",
				"post": "slopeY",
				"url": "https://en.wikipedia.org/wiki/Slope",
				"type": "range",
				"default": 0,
				"values": [-10, 10],
				"scale": "linear",
				"mandatory": "true"
			},  {
				"name": "Mound slope",
				"post": "plantSlope",
				"url": "https://en.wikipedia.org/wiki/Slope",
				"type": "range",
				"default": 0,
				"values": [-10, 10],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Mound width (m)",
				"post": "plantSlopeWidth",
				"type": "range",
				"default": 1,
				"values": [0, 2],
				"scale": "linear",
				"mandatory": "true"
			}],
			"Model": [{
				"name": "Simulated volume height (m)",
				"post": "height",
				"type": "range",
				"default": 1,
				"values": [1, 10],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Simulated volume width (m)",
				"post": "width",
				"type": "range",
				"default": 1,
				"values": [1, 10],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Simulated volume depth (m)",
				"post": "depth",
				"type": "range",
				"default": 1,
				"values": [1, 1.5],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Horizontal/vertical water conductivity ratio",
				"post": "conductivity",
				"url": "https://agupubs.onlinelibrary.wiley.com/doi/abs/10.1029/WR017i003p00565",
				"type": "range",
				"default": 1,
				"values": [0, 1],
				"scale": "linear",
				"mandatory": "true"
			}],
			"Soil": [{
				"name": "Thickness (m)",
				"post": "lower_depth",
				"type": "range",
				"default": 1,
				"values": [1, 1.5],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Sand percentage",
				"post": "sand",
				"type": "range",
				"default": 30,
				"values": [0, 100],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Silt percentage",
				"post": "silt",
				"type": "range",
				"default": 30,
				"values": [0, 100],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Clay percentage",
				"post": "clay",
				"type": "range",
				"default": 40,
				"values": [0, 100],
				"scale": "linear",
				"mandatory": "true"
			}, {
				"name": "Saturated hydraulic conductivity (K_sat)",
				"post": "Ks",
				"url": "https://casoilresource.lawr.ucdavis.edu/gmap/help/defn-ksat.html#:~:text=%22Saturated%20hydraulic%20conductivity%22%20is%20the,water%20movement%20through%20porous%20media).",
				"type": "range",
				"default": 0.0000006,
				"values": [0.0000001, 0.001],
				"scale": "logarithmic",
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Saturated hydraulic content (Theta_s)",
				"post": "thetaS",
				"url": "https://extension.okstate.edu/fact-sheets/understanding-soil-water-content-and-thresholds-for-irrigation-management.html#:~:text=Saturation%20is%20the%20threshold%20at,60%20percent%20in%20clay%20soils.",
				"type": "range",
				"default": 0.5,
				"values": [0.0, 1.0],
				"scale": "linear",
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Residual hydraulic content (Theta_r)",
				"post": "thetaR",
				"url": "https://www.sciencedirect.com/topics/engineering/residual-water-content",
				"type": "range",
				"default": 0.03,
				"values": [0.0, 1.0],
				"scale": "linear",
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Van Genuchten inverse air sunction (alpha)",
				"post": "VG_alpha",
				"url": "https://en.wikipedia.org/wiki/Water_retention_curve",
				"type": "range",
				"default": 2.2,
				"values": [0.5, 5],
				"scale": "logarithmic",
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Van Genuchten pore-size distribution (n)",
				"post": "VG_n",
				"url": "https://en.wikipedia.org/wiki/Water_retention_curve",
				"type": "range",
				"default": 1.33,
				"values": [1, 2],
				"scale": "logarithmic",
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Van Genuchten air mat. pot. (he)",
				"post": "VG_he",
				"url": "https://en.wikipedia.org/wiki/Water_retention_curve",
				"type": "range",
				"default": 0.23,
				"values": [0.001, 15],
				"scale": "logarithmic",
				"mandatory": "false",
				"hyperparopt": "true"
			}],
			"Plant": [{
				"name": "Position (x, x), (y, y)",
				"post": "plant",
				"type": "text",
				"default": "(0.0, 0.0), (0.0, 0.0)",
				"mandatory": "true"
			}, {
				"name": "Canopy radius",
				"post": "rootWidth",
				"type": "range",
				"default": 1,
				"values": [1, 3],
				"scale": "linear",
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Leaf area Index (LAI)",
				"post": "LAI",
				"type": "range",
				"default": 4,
				"values": [0.5, 5],
				"scale": "linear",
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Root shape",
				"post": "rootShape",
				"type": "radiogroup",
				"default": 0,
				"values": [
					"https://media.istockphoto.com/id/817203414/it/vettoriale/insieme-di-radici-degli-alberi.jpg?s=612x612&w=is&k=20&c=z9osf8fG3NMgrPxu7UVNcPFdoEftG-86gb9X2cbJyxM=",
					"https://media.istockphoto.com/id/817203414/it/vettoriale/insieme-di-radici-degli-alberi.jpg?s=612x612&w=is&k=20&c=z9osf8fG3NMgrPxu7UVNcPFdoEftG-86gb9X2cbJyxM="
				],
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Maximum crop coefficient (Kc_max)",
				"post": "kcMax",
				"url": "https://en.wikipedia.org/wiki/Crop_coefficient",
				"type": "range",
				"default": 1.65,
				"values": [0.5, 3],
				"scale": "linear",
				"mandatory": "false",
				"hyperparopt": "true"
			}, {
				"name": "Readily available water fraction (fRAW)",
				"post": "fRAW",
				"url": "https://www.dpi.nsw.gov.au/__data/assets/pdf_file/0003/531957/determining-readily-available-water-for-im.pdf",
				"type": "range",
				"default": 0.5,
				"values": [0, 1],
				"scale": "linear",
				"mandatory": "false",
				"hyperparopt": "true"
			}],
			"Dripper": [{
				"name": "Position (x, x, x), (y, y, y)",
				"post": "dripper",
				"type": "text",
				"default": "(0.0, 0.0, 0.0), (-0.67, 0.0, 0.67)",
				"mandatory": "true"
		}]
		
	}
}
