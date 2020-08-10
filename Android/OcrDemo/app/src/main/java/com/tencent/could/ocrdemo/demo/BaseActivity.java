package com.tencent.could.ocrdemo.demo;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.tencent.could.ocrdemo.utils.AutoSizeUtils;


/**
 * 当前使用Activity的基础
 *
 * @since 2020/7/28
 */
public class BaseActivity extends Activity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AutoSizeUtils.setCustomDensity(this, App.getApp());
    }
}
