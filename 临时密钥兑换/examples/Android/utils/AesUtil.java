package com.tencent.jerry.localtest.utils;

import android.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * 初步实现了AES加密的工具类
 *
 */
public class AesUtil {
    private static final String TAG = "AesUtil";
    // 加密时使用的Key
    public static final String ENCODE_KEY = "您的加密密钥6位";

    // 解压使用的密码
    public static final String DECODE_KEY = "您的解密密钥16位";

    // 编码使用的IV向量
    public static final String ENCODE_IV = "您的加密IV16位";

    // 解码使用的IV向量
    public static final String DECODE_IV = "您的解密IV16位";

    // 默认字符集
    private static final String CHARSET_NAME = "utf-8";

    /**
     * 私有构造方法
     */
    private AesUtil() {

    }


    /**
     * AES 加密算法
     *
     * @param content 加密内容
     * @param key     使用的key
     * @param ivStr   使用的iv
     * @return 返回结果
     */
    public static String encrypt(final String content, final String key, final String ivStr) {
        try {
            IvParameterSpec iv = new IvParameterSpec(ivStr.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
            byte[] encrypted = cipher.doFinal(content.getBytes("UTF-8"));
            String base64Str = Base64.encodeToString(encrypted, Base64.NO_WRAP);
            return bytesToHex(base64Str.getBytes("UTF-8"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * AES 解密算法
     *
     * @param encrypted  待解密内容
     * @param key     使用的key
     * @param ivStr   使用的iv
     * @return 返回结果
     */
    public static String decrypt(final String encrypted, final String key, final String ivStr) {
        try {
            IvParameterSpec iv = new IvParameterSpec(ivStr.getBytes("UTF-8"));
            SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, iv);
            byte[] afterHex = hexToByteArray(encrypted);
            byte[] original = cipher.doFinal(Base64.decode(afterHex, Base64.NO_WRAP));
            return new String(original);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * 字节数组转16进制
     *
     * @param bytes 需要转换的byte数组
     * @return 转换后的Hex字符串
     */
    public static String bytesToHex(byte[] bytes) {
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < bytes.length; i++) {
            String hex = Integer.toHexString(bytes[i] & 0xFF);
            if (hex.length() < 2) {
                stringBuffer.append(0);
            }
            stringBuffer.append(hex);
        }
        return stringBuffer.toString();
    }

    /**
     * Hex字符串转byte
     *
     * @param inHex 待转换的Hex字符串
     * @return 转换后的结果
     */
    private static byte hexToByte(String inHex) {
        return (byte) Integer.parseInt(inHex, 16);
    }

    /**
     * hex字符串转byte数组
     *
     * @param inHex 待转换的Hex字符串
     * @return 转换后结果
     */
    public static byte[] hexToByteArray(String inHex) {
        int length = inHex.length();
        byte[] result;
        if (length % 2 == 1) { // 奇数情况
            length++;
            result = new byte[(length / 2)];
            inHex = "0" + inHex;
        } else {    // 偶数情况
            result = new byte[(length / 2)];
        }
        int j = 0;
        for (int i = 0; i < length; i += 2) {
            result[j] = hexToByte(inHex.substring(i, i + 2));
            j++;
        }
        return result;
    }


}
