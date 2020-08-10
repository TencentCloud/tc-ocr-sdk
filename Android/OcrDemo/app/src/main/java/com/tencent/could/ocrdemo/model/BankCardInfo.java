package com.tencent.could.ocrdemo.model;

public class BankCardInfo {

    /**
     * BankInfo : 招商银行(03080000)
     * ValidDate : 07/2023
     * CardNo : 6225768888888888
     * RequestId : 3c42f615-fc29-4d55-8f3f-a229052f1db0
     */

    private String BankInfo;
    private String ValidDate;
    private String CardNo;
    private String RequestId;

    public String getBankInfo() {
        return BankInfo;
    }

    public void setBankInfo(String BankInfo) {
        this.BankInfo = BankInfo;
    }

    public String getValidDate() {
        return ValidDate;
    }

    public void setValidDate(String ValidDate) {
        this.ValidDate = ValidDate;
    }

    public String getCardNo() {
        return CardNo;
    }

    public void setCardNo(String CardNo) {
        this.CardNo = CardNo;
    }

    public String getRequestId() {
        return RequestId;
    }

    public void setRequestId(String RequestId) {
        this.RequestId = RequestId;
    }
}
