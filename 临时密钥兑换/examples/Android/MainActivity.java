package com.tencent.jerry.localtest;

import android.os.Bundle;

import com.tencent.jerry.localtest.utils.TmpTokenHelper;

import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.View;


public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        findViewById(R.id.test_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // 主动进行临时密钥兑换的方法
                TmpTokenHelper.getInstance().doUpdateTmpToken(new TmpTokenHelper.TmpTokenListener() {
                    @Override
                    public void onSuccess(String secretId, String secretKey, String tmpToken) {
                        // 通知OcrSDK更新临时密钥
                        Log.e(TAG, "secretId: " + secretId + " secretKey:" + secretKey + " tmpToken:" + tmpToken);
                        // 调用 OcrSDKKit.getInstance().updateFederationToken(secretId, secretKey, tmpToken); 用来更新SDK使用临时密钥
                    }

                    @Override
                    public void onError(int errorCode, String errorMsg) {
                        Log.e(TAG, "errorCode: " + errorCode + " errorMsg: " + errorMsg);
                    }
                });
            }
        });
    }
}