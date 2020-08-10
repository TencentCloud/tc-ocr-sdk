package com.tencent.could.ocrdemo.model;

/**
 * 存放结果项的数据
 *
 * @since 2020/7/30
 */
public class ResultItem {
    private String keyStr;
    private String valueStr;

    public ResultItem(final String key, final String value) {
        keyStr = key;
        valueStr = value;
    }

    public String getKeyStr() {
        return keyStr;
    }

    public String getValueStr() {
        return valueStr;
    }
}
