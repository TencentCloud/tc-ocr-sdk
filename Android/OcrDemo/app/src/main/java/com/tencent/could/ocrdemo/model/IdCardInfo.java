package com.tencent.could.ocrdemo.model;

public class IdCardInfo {

    /**
     * Name : 李明
     * Sex : 男
     * Nation : 汉
     * Birth : 1987/1/1
     * Address : 北京市石景山区高新技术园腾讯大楼
     * IdNum : 440524198701010014
     * Authority :
     * ValidDate :
     * AdvancedInfo : {}
     * RequestId : ab2c132e-9e1c-43d3-b0ef-9b4d80f00330
     */

    private String Name;
    private String Sex;
    private String Nation;
    private String Birth;
    private String Address;
    private String IdNum;
    private String Authority;
    private String ValidDate;
    private String AdvancedInfo;
    private String RequestId;

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getSex() {
        return Sex;
    }

    public void setSex(String Sex) {
        this.Sex = Sex;
    }

    public String getNation() {
        return Nation;
    }

    public void setNation(String Nation) {
        this.Nation = Nation;
    }

    public String getBirth() {
        return Birth;
    }

    public void setBirth(String Birth) {
        this.Birth = Birth;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String Address) {
        this.Address = Address;
    }

    public String getIdNum() {
        return IdNum;
    }

    public void setIdNum(String IdNum) {
        this.IdNum = IdNum;
    }

    public String getAuthority() {
        return Authority;
    }

    public void setAuthority(String Authority) {
        this.Authority = Authority;
    }

    public String getValidDate() {
        return ValidDate;
    }

    public void setValidDate(String ValidDate) {
        this.ValidDate = ValidDate;
    }

    public String getAdvancedInfo() {
        return AdvancedInfo;
    }

    public void setAdvancedInfo(String AdvancedInfo) {
        this.AdvancedInfo = AdvancedInfo;
    }

    public String getRequestId() {
        return RequestId;
    }

    public void setRequestId(String RequestId) {
        this.RequestId = RequestId;
    }

    @Override
    public String toString() {
        return "IdCardInfo{" +
                "Name='" + Name + '\'' +
                ", Sex='" + Sex + '\'' +
                ", Nation='" + Nation + '\'' +
                ", Birth='" + Birth + '\'' +
                ", Address='" + Address + '\'' +
                ", IdNum='" + IdNum + '\'' +
                ", Authority='" + Authority + '\'' +
                ", ValidDate='" + ValidDate + '\'' +
                ", AdvancedInfo='" + AdvancedInfo + '\'' +
                ", RequestId='" + RequestId + '\'' +
                '}';
    }
}
