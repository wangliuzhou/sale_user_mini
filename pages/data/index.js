import { formatMD } from "../../utils/util";
let chart = null;
var data = [
  {
    date: "2020-07-01",
    value: 83
  },
  {
    date: "2020-07-02",
    value: 12
  },
  {
    date: "2020-07-03",
    value: 107
  },
  {
    date: "2020-07-04",
    value: 82
  },
  {
    date: "2020-07-05",
    value: 44
  }
];

function initChart(canvas, width, height, F2) {
  // 使用 F2 绘制图表

  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data, {
    value: {
      tickCount: 5,
      min: 0
    },
    date: {
      type: "timeCat",
      range: [0, 1],
      tickCount: 5,
      formatter: timeStamp => {
        return formatMD(new Date(timeStamp));
      }
    }
  });
  chart.tooltip({
    custom: true,
    showXTip: true,
    showYTip: true,
    snap: true,
    crosshairsType: "xy",
    crosshairsStyle: {
      lineDash: [2]
    }
  });
  chart.axis("date", {
    label: function label(text, index, total) {
      const textCfg = {};
      if (index === 0) {
        textCfg.textAlign = "left";
      } else if (index === total - 1) {
        textCfg.textAlign = "right";
      }
      return textCfg;
    }
  });

  chart.area().position("date*value");
  chart.line().position("date*value");
  chart.render();
  // 注意：需要把chart return 出来
  return chart;
}

Page({
  data: {
    opts: {
      onInit: initChart
    },
    showCanvas: true
  },
  onReady: function() {
    setTimeout(() => {
      const newData = [
        {
          date: "2020-07-01",
          value: 83
        },
        {
          date: "2020-07-02",
          value: 12
        },
        {
          date: "2020-07-03",
          value: 107
        },
        {
          date: "2020-07-04",
          value: 82
        },
        {
          date: "2020-07-05",
          value: 44
        },
        {
          date: "2020-07-06",
          value: 72
        },
        {
          date: "2020-07-07",
          value: 106
        },
        {
          date: "2020-07-08",
          value: 107
        },
        {
          date: "2020-07-09",
          value: 66
        },
        {
          date: "2020-07-10",
          value: 91
        }
      ];
      chart.changeData(newData);
    }, 555);
  },
  onRangeComplete() {
    this.setData({ showCanvas: true });
    setTimeout(() => {
      const newData = [
        {
          date: "07-01",
          value: 83
        },
        {
          date: "07-02",
          value: 12
        },
        {
          date: "07-04",
          value: 82
        },
        {
          date: "07-09",
          value: 66
        },
        {
          date: "07-10",
          value: 91
        }
      ];
      chart.changeData(newData);
    }, 333);
  },
  onShowPicker(e) {
    console.log(111, e);
    const showPicker = e.detail;
    if (showPicker) {
      this.setData({ showCanvas: false });
    }
  }
});
