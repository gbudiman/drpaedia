var calendar_charting = function() {
	var chart

	var init = function() {
		load_data()
	}

	var resize_chart = function() {
		chart.setSize($(window).width(), $(window).height() - 80)
	}

	var load_data = function() {
		var y = new Date()

		$.ajax({
			url: '/calendar/events',
			method: 'GET'
		}).done(function(res){
			chart = new Highcharts.chart('chart', {
				chart: {
					type: 'scatter',
					style: {
						fontFamily: 'Exo'
					},
					scrollablePlotArea: {
						minWidth: 1200,
						scrollPositionX: 0
					},
					panning: true,
					zoomType: 'x',
					height: res.category.length * 24,
				},
				credits: false,
				tooltip: {
					formatter: function() {
						var d = new Date(this.x)
						return this.key + '<br />' + (d.getUTCMonth() + 1) + '/' + d.getUTCDate()
					},
					borderColor: '#aaa',
				},
				title: false,
				series: [
					{ data: res.data.national.data, name: 'National', marker: { symbol: 'diamond', fillColor: 'rgba(242, 143, 67, 0.8)', lineWidth: 2, lineColor: 'rgba(242, 143, 67, 0.8)' }, states: { hover: { halo: { attributes: { fill: 'rgba(242, 143, 67, 0.8)' }}}}},
					{ data: res.data.west_coast.data, name: 'West Coast', marker: { symbol: 'circle', fillColor: 'rgba(139, 188, 33, 0.8)'}, states: { hover: { halo: { attributes: { fill: 'rgba(139, 188, 33, 0.8)' }}}}},
					{ data: res.data.central.data, name: 'Central', marker: { symbol: 'square', fillColor: 'rgba(26, 173, 206, 0.8)' }, states: { hover: { halo: { attributes: { fill: 'rgba(26, 173, 206, 0.8)' }}}}},
					{ data: res.data.south.data, name: 'South', marker: { symbol: 'diamond', fillColor: 'rgba(73, 41, 112, 0.8)', lineWidth: 2, lineColor: 'rgba(73, 41, 112, 0.8)' }, states: { hover: { halo: { attributes: { fill: 'rgba(73, 41, 112, 0.8)' }}}}},
					{ data: res.data.east_coast.data, name: 'East Coast', marker: { symbol: 'circle', fillColor: 'rgba(242, 143, 67, 0.8)' }, states: { hover: { halo: { attributes: { fill: 'rgba(242, 143, 67, 0.8)' }}}}},
					{ data: res.data.midwest.data, name: 'Midwest', marker: { symbol: 'square', fillColor: 'rgba(26, 173, 206, 0.8)' }, states: { hover: { halo: { attributes: { fill: 'rgba(26, 173, 206, 0.8)' }}}}},
					{ data: res.data.north.data, name: 'North', marker: { symbol: 'diamond', fillColor: 'rgba(73, 41, 112, 0.8)', lineWidth: 2, lineColor: 'rgba(73, 41, 112, 0.8)' }, states: { hover: { halo: { attributes: { fill: 'rgba(73, 41, 112, 0.8)' }}}}},
				],
				xAxis: [{
					type: 'datetime',
					scrollbar: { enabled: true },
					minorTicks: true,
					minRange: 24 * 60 * 60 * 7 * 1000,
					min: Date.UTC(y.getFullYear(), 0, 1),
					gridLineWidth: 4,
					opposite: true,
					crosshair: {
						borderWidth: 1,
						snap: false
					},
					plotLines: [{
						value: Date.UTC(y.getFullYear(), y.getUTCMonth(), y.getUTCDate()),
						width: 4,
						color: '#c42525'
					}]
				}, {
					type: 'datetime',
					linkedTo: 0,
					opposite: false
				}],
				yAxis: {
					type: 'category',
					scrollbar: { enabled: true },
					categories: res.category,
					title: false,
					labels: {
						style: {
							fontFamily: 'Exo',
						}
					},
					minorTicks: true,
					crosshair: {
						borderWidth: 1,
						snap: true
					},
					plotBands: [
						{ from: 18.5, to: 19.5, color: 'rgba(242, 143, 67, 0.25)' },
						{ from: 15.5, to: 18.5, color: 'rgba(139, 188, 33, 0.15)' },
						{ from: 10.5, to: 15.5, color: 'rgba(26, 173, 206, 0.15)' },
						{ from: 8.5, to: 10.5, color: 'rgba(73, 41, 112, 0.15)' },
						{ from: 3.5, to: 8.5, color: 'rgba(242, 143, 67, 0.15)' },
						{ from: 0.5, to: 3.5, color: 'rgba(26, 173, 206, 0.15)' },
						{ from: -0.5, to: 0.5, color: 'rgba(73, 41, 112, 0.15)' },
					]
					
				},
				plotOptions: {
					scatter: {

					}
				},

			})

			// $(window).on('resize', resize_chart)
			// resize_chart()
			//chart.yAxis[0].setCategories(res.category)
			//console.log(chart.yAxis[0].categories)
			//console.log(res.data)
			//chart.series[0].setData(res.data)
			

		})
	}

	return {
		init: init,
		get_chart: function() { return chart }
	}
}();
