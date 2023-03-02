import React from "react"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Chart from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy"

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars Per Language",
        decimals: 0,
        doughNutRadius: "45%",
        showPercentValues: 0,
        theme: "candy",
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default Doughnut2d
