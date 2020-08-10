package com.tencent.could.ocrdemo.demo;

import android.app.Application;

/**
 * demo应用对应的Application
 *
 * @since 2020/7/27
 */
public class App extends Application {

    private static App allApp;

    @Override
    public void onCreate() {
        super.onCreate();
        allApp = this;
    }


    /**
     * 获得上下文的全局对象
     *
     * @return 全局app
     */
    public static App getApp() {
        return allApp;
    }
}
