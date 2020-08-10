package com.tencent.jerry.localtest.utils;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;

/**
 * 添加网络请求方法
 *
 */
public class NetWorkConnectUtil {
    // 网络格式异常URL
    private static final int URL_FORMED_ERROR = 0x01;
    // 返回码非200
    private static final int RESPONSE_CODE_NOT_HTTP_OK_ERROR = 0x02;
    // 网络请求异常
    private static final int NETWORK_CONNECT_ERROR = 0x03;
    // SSLContext创建失败
    private static final int CREATE_SSL_CONTEXT_ERROR = 0x04;

    /**
     * 私有构造方法
     */
    private NetWorkConnectUtil() {
    }

    /**
     * 网络请求回调监听
     */
    public interface NetWorkListener {
        void onSuccess(String result);

        void onError(int errorCode, String errorMsg);
    }

    /**
     * 检测是否为https请求
     *
     * @param urlStr 请求的Url
     * @return 是否为https
     */
    private static boolean checkIsHttps(final String urlStr) {
        return urlStr != null && urlStr.startsWith("https");
    }

    /**
     * 链接的初始化操作
     *
     * @param connection 链接对象
     * @throws ProtocolException
     */
    private static void commonInitConnection(HttpURLConnection connection) throws ProtocolException {
        connection.setConnectTimeout(6000);
        connection.setUseCaches(false); // 不使用缓存
        connection.setInstanceFollowRedirects(true); // 是成员变量 仅作用域当前函数，设置当前这个对象
        connection.setReadTimeout(3000);
        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        // 设置维持长连接
        connection.setRequestProperty("Connection", "Keep-Alive");
        // 设置文件字符集:
        connection.setRequestProperty("Charset", "UTF-8");
        // 设置文件类型:
        connection.setRequestProperty("Content-Type", "application/json");
    }

    /**
     * 最简单写一个网络请求
     *
     * @param urlStr   网络请求的url
     * @param param    网络请求参数
     * @param listener 网络请求结果回调
     */
    public static void postToUrl(final String urlStr, final String param, NetWorkListener listener) {
        try {
            URL url = new URL(urlStr);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            ;
            // 检测是否为https
            if (checkIsHttps(urlStr) && connection instanceof HttpsURLConnection) {
                // 为其添加信任证书
                SSLContext sslContext = SslContextUtil.getSSLContextWithoutCer();
                if (sslContext != null) {
                    SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();
                    ((HttpsURLConnection) connection).setDefaultSSLSocketFactory(sslSocketFactory);
                    ((HttpsURLConnection) connection).setHostnameVerifier(SslContextUtil.hostnameVerifier);
                }

            }
            commonInitConnection(connection);
            // 获取输入输出流
            OutputStream out = connection.getOutputStream();
            //缓冲字节流  包装字节流
            BufferedOutputStream bos = new BufferedOutputStream(out);
            byte[] paramByte = param.getBytes("UTF-8");
            //把字节流数组写入缓冲区中
            bos.write(paramByte);
            //刷新缓冲区 发送数据
            bos.flush();
            out.close();
            bos.close();
            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                InputStream in = connection.getInputStream();
                StringBuilder stringBuilder = new StringBuilder();
                BufferedReader reader = new BufferedReader(new InputStreamReader(in));
                String line;
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line);
                }
                if (listener != null) {
                    listener.onSuccess(stringBuilder.toString());
                }
                in.close();
            } else {
                sendErrorMsg(listener, RESPONSE_CODE_NOT_HTTP_OK_ERROR, "response code : " + connection.getResponseCode());
            }
            connection.disconnect();
        } catch (MalformedURLException e) {
            sendErrorMsg(listener, URL_FORMED_ERROR, "please input a support url!");
        } catch (IOException e) {
            sendErrorMsg(listener, NETWORK_CONNECT_ERROR, "network connect error!");
        } catch (NoSuchAlgorithmException | KeyManagementException e) {
            sendErrorMsg(listener, CREATE_SSL_CONTEXT_ERROR, "create ssl context error!");
        }
    }

    /**
     * 发送错误信息
     *
     * @param listener  回调监听
     * @param errorCode 错误码
     * @param errorMsg
     */
    private static void sendErrorMsg(NetWorkListener listener, int errorCode, final String errorMsg) {
        if (listener == null) {
            return;
        }
        listener.onError(errorCode, errorMsg);
    }
}
