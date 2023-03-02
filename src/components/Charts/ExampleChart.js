import React from "react"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Chart from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

const ExampleChart = () => {
  return <div>chart</div>
}

export default ExampleChart
