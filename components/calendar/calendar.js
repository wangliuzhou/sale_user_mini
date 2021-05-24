// components/calendar/calendar.js
import { formatDate, formatTime } from "./../../utils/util";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showIcon: {
      type: Boolean,
      value: true
    },
    beginDate: String,
    endDate: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    formatDateText: ""
  },
  attached: function() {
    this.setData({
      maxDate: formatDate(new Date())
    });
  },
  /**
   * 组件的方法列表
   */
  ready() {
    this.calendar = this.selectComponent("#calendar");
  },
  methods: {
    onDayClick: function(event) {
      console.log(event);
    },
    onRangeComplete: function(event) {
      const { begin, end } = event.detail;
      const a = formatDate(begin);
      const b = formatDate(end);
      this.setData({ formatDateText: a + " 至 " + b });
      const begin2 = formatTime(begin);
      const end2 = formatTime(end);
      this.triggerEvent("OnRangeComplete", { begin: begin2, end: end2 });
    },
    onMonthChange: function(event) {},
    showPicker() {
      this.calendar.showPicker();
    },
    setFormatDateText() {
      if (this.properties.beginDate && this.properties.endDate) {
        const a = formatDate(new Date(this.properties.beginDate));
        const b = formatDate(new Date(this.properties.endDate));
        this.setData({ formatDateText: a + " 至 " + b });
      }
    }
  }
});
