package com.tencent.could.ocrdemo.model;

import android.graphics.Bitmap;

public class CardItem {
    private Bitmap iconBitmap;
    private String title;
    private String desc;
    private Boolean isPlusComplete;

    public CardItem(Bitmap iconBitmap, String title, String desc) {
        this.iconBitmap = iconBitmap;
        this.title = title;
        this.desc = desc;
        this.isPlusComplete = false;
    }

    public Boolean getPlusComplete() {
        return isPlusComplete;
    }

    public void setPlusComplete(Boolean plusComplete) {
        isPlusComplete = plusComplete;
    }

    public Bitmap getIconBitmap() {
        return iconBitmap;
    }

    public void setIconBitmap(Bitmap iconBitmap) {
        this.iconBitmap = iconBitmap;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
