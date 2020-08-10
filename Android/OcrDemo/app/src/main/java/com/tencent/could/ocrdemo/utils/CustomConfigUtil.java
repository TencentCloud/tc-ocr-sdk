package com.tencent.could.ocrdemo.utils;

import com.tencent.could.ocrdemo.R;
import com.tencent.could.ocrdemo.demo.App;
import com.tencent.ocr.sdk.common.CustomConfigUi;

/**
 * 自定义UI的配置
 *
 * @since 2020/7/24
 */
public class CustomConfigUtil {

    private CustomConfigUi customConfigUi;

    /**
     * 私有构造方法
     */
    private CustomConfigUtil() {
        initConfig();
    }

    /**
     * 静态内部类
     */
    private static final class CustomConfigUtilHolder {
        private static final CustomConfigUtil INSTANCE = new CustomConfigUtil();
    }

    /**
     * 单例方法
     *
     * @return 单例对象
     */
    public static CustomConfigUtil getInstance() {
        return CustomConfigUtilHolder.INSTANCE;
    }

    /**
     * 初始化相关信息
     */
    private void initConfig() {
        customConfigUi = new CustomConfigUi();
        customConfigUi.setTitleBarText("测试识别信息");
        customConfigUi.setShowTitleBar(false);
        customConfigUi.setRemindDialogText("这里是一段提示文字信息");
        // 测试颜色修改
        int testColor = App.getApp().getResources().getColor(R.color.pale_green);
        customConfigUi.setTitleColor(testColor);
        customConfigUi.setCardFrameColor(testColor);
        customConfigUi.setRemindConfirmColor(testColor);
        customConfigUi.setSuccessRemindTextColor(testColor);
        // 更新可以自定义的图片样式
        customConfigUi.setLightImageResId(R.drawable.config_ocr_light_on, R.drawable.config_ocr_light_off);
        customConfigUi.setTakePicturesResId(R.drawable.config_ocr_take_pictures);
        customConfigUi.setImageSelectResId(R.drawable.config_ocr_photo_album);
    }

    /**
     * 获取当前的UI配置
     *
     * @return 当前的ui配置
     */
    public CustomConfigUi getCustomConfigUi() {
        return customConfigUi;
    }
}
