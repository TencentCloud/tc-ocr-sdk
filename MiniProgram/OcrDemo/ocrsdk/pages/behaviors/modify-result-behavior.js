module.exports = Behavior({

  methods: {
    onResultChange(e) {
      const { key } = e.currentTarget.dataset;
      const value = e.detail;
      const result = this.data.ocrResponse;
      result[key].value = value;
      this.setData({
        ocrResponse: result,
      });
    },
  },
});
