package com.tencent.jerry.localtest.utils;

import android.os.Build;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.UUID;

/**
 * 用来关联临时密钥的工具类
 *
 */
public class TmpTokenHelper {
    private static final String TAG = "TmpTokenHelper";
    // 解码错误
    private static final int ERROR_CODE_PARSE = 0x99;
    // 临时密钥id
    private String tmpSecretId;

    // 临时密钥key
    private String tmpSecretKey;

    // 对应的临时密钥的token
    private String tmpToken;


    private TmpTokenHelper() {
        tmpSecretId = "SecretPamera.secretId";
        tmpSecretKey = "SecretPamera.secretKey";
        tmpToken = "";
    }

    /**
     * 静态内部类形式的单例
     */
    private static final class TmpTokenHelperHolder {
        private static final TmpTokenHelper INSTANCE = new TmpTokenHelper();
    }

    /**
     * 单例对象
     *
     * @return 获取单例对象
     */
    public static TmpTokenHelper getInstance() {
        return TmpTokenHelperHolder.INSTANCE;
    }

    public String getTmpSecretId() {
        return tmpSecretId;
    }

    public String getTmpSecretKey() {
        return tmpSecretKey;
    }

    public String getTmpToken() {
        return tmpToken;
    }


    /**
     * 本地测试，兑换临时密钥的方法
     *
     * @param listener 结果监听的listener
     */
    public void doUpdateTmpToken(final TmpTokenListener listener) {
        if (listener == null) {
            return;
        }
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
            	// 填写您服务器接口对应的url
                String url = "您服务器端的接口地址";
                // 构造请求参数
                try {
                    String param = crateParam();
                    NetWorkConnectUtil.postToUrl(url, param, new NetWorkConnectUtil.NetWorkListener() {
                        @Override
                        public void onSuccess(String result) {
                            if (parseValue(result)) {
                                // 返回结果实现刷新
                                listener.onSuccess(tmpSecretId, tmpSecretKey, tmpToken);
                            } else {
                                listener.onError(ERROR_CODE_PARSE, "parseValue error!");
                            }
                        }

                        @Override
                        public void onError(int errorCode, String errorMsg) {
                            listener.onError(errorCode, errorMsg);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        thread.start();
    }


    /**
     * 模拟生成参数方法
     *
     * @return 参数信息
     */
    private String crateParam() {
        try {
            // 用户可自定义参数信息，下面的参数位示例
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("RequestId", UUID.randomUUID().toString());
            jsonObject.put("Timestamp", System.currentTimeMillis());
            jsonObject.put("OSVersion", android.os.Build.VERSION.SDK_INT);
            jsonObject.put("SdkVersion", "OcrSDKv1.0.2-alpha6");
            jsonObject.put("Model", Build.MODEL);
            String requestData = jsonObject.toString();
            String encode = AesUtil.encrypt(requestData, AesUtil.ENCODE_KEY, AesUtil.ENCODE_IV);
            JSONObject requestJson = new JSONObject();
            requestJson.put("request", encode);
            return requestJson.toString();
        } catch (JSONException e) {
            Log.e(TAG, "Some Json Exception!");
            return "";
        }
    }


    /**
     * 解析服务器端返回结果，服务器返回数据您可以自定义
     *
     * @param jsonString 结果数据
     * @return 解析成功
     */
    private boolean parseValue(final String jsonString) {
        try {
            JSONObject jsonObject = new JSONObject(jsonString);
            if (!jsonObject.has("statusCode")) {
                Log.e(TAG, "do not have value statusCode");
                return false;
            }
            int code = jsonObject.getInt("statusCode");
            if (code != 0) {
                String message = jsonObject.has("message") ? jsonObject.getString("message") : "";
                Log.e(TAG, "statusCode != 0, = " + code + " message: " + message);
                return false;
            }
            if (!jsonObject.has("data")) {
                Log.e(TAG, "do not have value data");
            }
            // 正式进行加密和获取临时密钥的操作
            decodeAndParseValue(jsonObject.getString("data"));
            return true;
        } catch (JSONException e) {
            Log.e(TAG, "Some JSONException happen in parseValue, please check it!");
            return false;
        }
    }

    /**
     * 解析临时密钥的方法，解析临时密钥数据
     *
     * @param encodeStr 临时密钥的字符串
     * @throws JSONException Json解析异常
     */
    private void decodeAndParseValue(final String encodeStr) throws JSONException {
        String decodeValue = AesUtil.decrypt(encodeStr, AesUtil.DECODE_KEY, AesUtil.DECODE_IV);
        if (decodeValue == null) {
            Log.e(TAG, "decode error!");
            return;
        }
        JSONObject jsonObject = new JSONObject(decodeValue);
        if (!jsonObject.has("Credentials")) {
            Log.e(TAG, "Json do not has Credentials");
            return;
        }
        JSONObject ceredentials = jsonObject.getJSONObject("Credentials");
        // 获取Token
        if (ceredentials.has("Token")) {
            tmpToken = ceredentials.getString("Token");
        }
        // 获取TmpSecretId
        if (ceredentials.has("TmpSecretId")) {
            tmpSecretId = ceredentials.getString("TmpSecretId");
        }
        // 获取tmpSecretKey
        if (ceredentials.has("TmpSecretKey")) {
            tmpSecretKey = ceredentials.getString("TmpSecretKey");
        }
    }

    /**
     * 用来监听的结果回调
     */
    public interface TmpTokenListener {
        /**
         * 兑换成功
         *
         * @param secretId  临时密钥id
         * @param secretKey 临时密钥key
         * @param tmpToken  以及临时Token
         */
        void onSuccess(final String secretId, final String secretKey, final String tmpToken);

        /**
         * 错误信息
         *
         * @param errorCode 错误码
         * @param errorMsg  错误信息
         */
        void onError(int errorCode, final String errorMsg);
    }
}
