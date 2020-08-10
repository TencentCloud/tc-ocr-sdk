package com.tencent.could.ocrdemo.components;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * 保存到本地的配置文件
 */
public class SharedPreference {

    private static String FILLNAME = "config";// 文件名称
    private static SharedPreferences mSharedPreferences = null;

    public final static String OCR_MODE_TYPE = "ocr_mode_type";

    /**
     * 单例模式
     */
    public static synchronized SharedPreferences getInstance(Context context) {
        if (mSharedPreferences == null) {
            mSharedPreferences = context.getApplicationContext().getSharedPreferences(FILLNAME, Context.MODE_PRIVATE);
        }
        return mSharedPreferences;
    }


    public static void putString(String key, String value, Context context) {
        SharedPreference.getInstance(context).edit().putString(key, value).apply();
    }

    public static String getString(String key, String defValue, Context context) {
        return SharedPreference.getInstance(context).getString(key, defValue);
    }

    public static void putInt(String key, int value, Context context) {
        SharedPreference.getInstance(context).edit().putInt(key, value).apply();
    }

    public static int getInt(String key, int defValue, Context context) {
        return SharedPreference.getInstance(context).getInt(key, defValue);
    }

    /**
     * 移除某个key值已经对应的值
     */
    public static void remove(String key, Context context) {
        SharedPreference.getInstance(context).edit().remove(key).apply();
    }

    /**
     * 清除所有内容
     */
    public static void clear(Context context) {
        SharedPreference.getInstance(context).edit().clear().apply();
    }
}