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
		//chart.xAxis[0].setExtremes(Date.UTC(y.getFullYear(), 0, 1))

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
					zoomType: 'x'
				},
				legend: false,
				credits: false,
				tooltip: {
					formatter: function() {
						var d = new Date(this.x)
						return this.key + '<br />' + (d.getUTCMonth() + 1) + '/' + d.getUTCDate()
					}
				},
				title: { 
					text: 'Dystopia Rising Events Calendar',
					style: { fontFamily: 'Exo' }
				},
				series: [{ 
					data: res.data,
					zones: [
						{ value: 1, color: 'rgba(73, 41, 112, 0.8)'},
						{ value: 6, color: 'rgba(26, 173, 206, 0.8)'},
						{ value: 11, color: 'rgba(242, 143, 67, 0.8)'},
						{ value: 13, color: 'rgba(73, 41, 112, 0.8)'},
						{ value: 16, color: 'rgba(26, 173, 206, 0.8)'},
						{ value: 19, color: 'rgba(139, 188, 33, 0.8)'},
						{ value: 20, color: 'rgba(145, 0, 0, 0.8)'},
					]
				}],
				xAxis: {
					type: 'datetime',
					scrollbar: { enabled: true },
					minorTicks: true,
					minRange: 24 * 60 * 60 * 7 * 1000,
					min: Date.UTC(y.getFullYear(), 0, 1),
					plotLines: [{
						value: Date.UTC(y.getFullYear(), y.getUTCMonth(), y.getUTCDate()),
						width: 4,
						color: '#c42525'
					}]
					//max: 9
				},
				yAxis: {
					type: 'category',
					scrollbar: { enabled: true },
					categories: res.category,
					title: false,
					labels: {
					}
					
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
		init: init
	}
}()