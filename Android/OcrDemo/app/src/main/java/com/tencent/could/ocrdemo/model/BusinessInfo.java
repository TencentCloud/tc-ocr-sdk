package com.tencent.could.ocrdemo.model;

import java.util.List;

/**
 * Time: 2020/6/3
 * Author: Long_cC
 */
public class BusinessInfo {

    /**
     * BusinessCardInfos : [{"Name":"姓名","Value":"李明"},{"Name":"职位","Value":"优图研发中心工程师"},{"Name":"地址","Value":"上海市徐汇区田林路397号腾云大厦6F"},{"Name":"邮箱","Value":"abc8888@qq.com"},{"Name":"手机","Value":"+86-185-8907-2228"},{"Name":"QQ","Value":"888888"}]
     * RetImageBase64 : /9j/4A=
     * RequestId : f514946a-1a60-4295-87bb-44f37152089b
     */

    private String RetImageBase64;
    private String RequestId;
    private List<BusinessCardInfosBean> BusinessCardInfos;

    public String getRetImageBase64() {
        return RetImageBase64;
    }

    public void setRetImageBase64(String RetImageBase64) {
        this.RetImageBase64 = RetImageBase64;
    }

    public String getRequestId() {
        return RequestId;
    }

    public void setRequestId(String RequestId) {
        this.RequestId = RequestId;
    }

    public List<BusinessCardInfosBean> getBusinessCardInfos() {
        return BusinessCardInfos;
    }

    public void setBusinessCardInfos(List<BusinessCardInfosBean> BusinessCardInfos) {
        this.BusinessCardInfos = BusinessCardInfos;
    }

    public static class BusinessCardInfosBean {
        /**
         * Name : 姓名
         * Value : 李明
         */

        private String Name;
        private String Value;

        public String getName() {
            return Name;
        }

        public void setName(String Name) {
            this.Name = Name;
        }

        public String getValue() {
            return Value;
        }

        public void setValue(String Value) {
            this.Value = Value;
        }
    }
}
