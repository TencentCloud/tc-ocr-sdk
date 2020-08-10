package com.tencent.jerry.localtest.utils;

import android.annotation.SuppressLint;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

/**
 * https请求的帮助类
 *
 */
public class SslContextUtil {

    /**
     * 没有安全证书的SSLContext
     *
     * @return SSLContext
     * @throws NoSuchAlgorithmException
     * @throws KeyManagementException
     */
    @SuppressLint("TrulyRandom")
    public static SSLContext getSSLContextWithoutCer() throws NoSuchAlgorithmException, KeyManagementException {
        // 实例化SSLContext
        // 这里参数可以用TSL 也可以用SSL
        SSLContext sslContext = SSLContext.getInstance("SSL");
        sslContext.init(null, new TrustManager[]{trustManagers}, new SecureRandom());
        return sslContext;

    }

    private static TrustManager trustManagers = new X509TrustManager() {

        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
        }

        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {

        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[0];
        }
    };
    /**
     * 验证主机名
     */
    public static HostnameVerifier hostnameVerifier = new HostnameVerifier() {

        @Override
        public boolean verify(String hostname, SSLSession session) {
            // TODO Auto-generated method stub
            return true;
        }
    };
}
