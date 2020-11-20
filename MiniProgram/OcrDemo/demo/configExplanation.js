const configExplanation = {
  theme: {
    title: '主题',
    content: '主题配色，默认为 primary，目前支持如下值：primary(#006EFF)，native(#07C160 微信原生绿色)',
  },
  maxTry: {
    title: '自动模式下最多尝试次数',
    content: '在自动识别模式下，相机会在用户手机稳定的情况下自动抓拍然后立即识别。如果识别失败的话会重新自动抓拍，识别，直到成功识别或达到最大尝试次数为止。',
  },
  disableAlbum: {
    title: '禁用相册',
    content: '是否禁止用户从相册选择照片。默认允许使用。该选项打开时，拍摄页面上将不会出现照片选择按钮，用户将不可以从相册中选择图片。',
  },
  resultPage: {
    title: '展示结果页',
    content: '识别完成后是否展示结果页面。',
  },
  modifiable: {
    title: '结果可修改',
    content: '是否允许对 OCR 识别的结果进行修改。默认不允许修改',
  },
};

module.exports = configExplanation;
