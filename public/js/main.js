const currentHistory = [],
  voltageHistory = [],
  activePowerHistory = [];

window.Apex = {
  chart: {
    foreColor: "#fff",
    toolbar: {
      show: false,
    },
  },
  colors: ["#51b4b6", "#37a2d0"],
  stroke: {
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#40475D",
  },
  xaxis: {
    axisTicks: {
      color: "#333",
    },
    axisBorder: {
      color: "#333",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      gradientToColors: ["#51b4b6", "#37a2d0"],
    },
  },
  tooltip: {
    theme: "dark",
    x: {
      formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss");
      },
    },
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10,
    },
  },
};

const chartCurrent = new ApexCharts(document.querySelector("#chart-current"), {
  title: {
    text: "Current (A)",
    align: "left",
    style: {
      fontSize: "16px",
    },
  },
  // subtitle: {
  //   text: "20",
  //   floating: true,
  //   align: "right",
  //   offsetY: 0,
  //   style: {
  //     fontSize: "22px",
  //   },
  // },
  // legend: {
  //   show: true,
  //   floating: true,
  //   horizontalAlign: "left",
  //   onItemClick: {
  //     toggleDataSeries: false,
  //   },
  //   position: "top",
  //   offsetY: -33,
  //   offsetX: 60,
  // },

  series: [
    {
      name: "Data",
      data: currentHistory,
    },
  ],
  chart: {
    type: "line",
    height: 250,
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    // dropShadow: {
    //   enabled: true,
    //   opacity: 0.3,
    //   blur: 5,
    //   left: -7,
    //   top: 22,
    // },
    // toolbar: {
    //   show: false,
    // },
    // zoom: {
    //   enabled: false,
    // },
  },

  xaxis: {
    type: "datetime",
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value.toFixed(2);
      },
    },
  },
});

chartCurrent.render();

const chartVoltage = new ApexCharts(document.querySelector("#chart-voltage"), {
  title: {
    text: "Voltage (V)",
    align: "left",
    style: {
      fontSize: "16px",
    },
  },
  // subtitle: {
  //   text: "20",
  //   floating: true,
  //   align: "right",
  //   offsetY: 0,
  //   style: {
  //     fontSize: "22px",
  //   },
  // },
  // legend: {
  //   show: true,
  //   floating: true,
  //   horizontalAlign: "left",
  //   onItemClick: {
  //     toggleDataSeries: false,
  //   },
  //   position: "top",
  //   offsetY: -33,
  //   offsetX: 60,
  // },

  series: [
    {
      name: "Data",
      data: voltageHistory,
    },
  ],
  chart: {
    type: "line",
    height: 250,
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    // dropShadow: {
    //   enabled: true,
    //   opacity: 0.3,
    //   blur: 5,
    //   left: -7,
    //   top: 22,
    // },
    // toolbar: {
    //   show: false,
    // },
    // zoom: {
    //   enabled: false,
    // },
  },

  xaxis: {
    type: "datetime",
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value.toFixed(2);
      },
    },
  },
});

chartVoltage.render();

const chartActivePower = new ApexCharts(document.querySelector("#chart-active-power"), {
  title: {
    text: "Active Power (W)",
    align: "left",
    style: {
      fontSize: "16px",
    },
  },
  // subtitle: {
  //   text: "20",
  //   floating: true,
  //   align: "right",
  //   offsetY: 0,
  //   style: {
  //     fontSize: "22px",
  //   },
  // },
  // legend: {
  //   show: true,
  //   floating: true,
  //   horizontalAlign: "left",
  //   onItemClick: {
  //     toggleDataSeries: false,
  //   },
  //   position: "top",
  //   offsetY: -33,
  //   offsetX: 60,
  // },

  series: [
    {
      name: "Data",
      data: voltageHistory,
    },
  ],
  chart: {
    type: "line",
    height: 250,
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    // dropShadow: {
    //   enabled: true,
    //   opacity: 0.3,
    //   blur: 5,
    //   left: -7,
    //   top: 22,
    // },
    // toolbar: {
    //   show: false,
    // },
    // zoom: {
    //   enabled: false,
    // },
  },

  xaxis: {
    type: "datetime",
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value.toFixed(2);
      },
    },
  },
});

chartActivePower.render();

function updateCurrent({ parameter, factor, unit, data, ts }) {
  const value = data * factor;
  const epoch = new Date(ts).getTime();

  currentHistory.push([epoch, value]);

  chartCurrent.updateSeries([
    {
      data: currentHistory,
    },
  ]);
}

function updateVoltage({ parameter, factor, unit, data, ts }) {
  const value = data * factor;
  const epoch = new Date(ts).getTime();

  voltageHistory.push([epoch, value]);

  chartVoltage.updateSeries([
    {
      data: voltageHistory,
    },
  ]);
}

function updateActivePower({ parameter, factor, unit, data, ts }) {
  // const value = data * factor / 1000;
  const value = data;
  const epoch = new Date(ts).getTime();

  activePowerHistory.push([epoch, value]);

  chartActivePower.updateSeries([
    {
      data: activePowerHistory,
    },
  ]);
}

const url = new URL("/subscribe", window.location.href);
url.protocol = url.protocol.replace("http", "ws");
url.protocol = url.protocol.replace("https", "wss");
const ws = new WebSocket(url.href);
ws.addEventListener("message", (e) => {
  const data = JSON.parse(e.data);
  updateCurrent(data[314]);
  updateVoltage(data[305]);
  updateActivePower(data[321]);
});
