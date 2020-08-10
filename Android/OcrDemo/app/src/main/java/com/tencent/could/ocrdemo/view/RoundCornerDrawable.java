package com.tencent.could.ocrdemo.view;

import android.graphics.Canvas;
import android.graphics.ColorFilter;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.drawable.Drawable;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;


public class RoundCornerDrawable extends Drawable {
    private final int color;
    private final float radius;
    private final Paint paint;
    private final RectF rectF;

    RoundCornerDrawable(int color, float radius) {
        this.color = color;
        this.radius = radius;

        this.paint = new Paint();
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(color);
        paint.setAntiAlias(true);

        rectF = new RectF();
    }

    // 用于设置Drawable宽高
    public void setRect(int width, int height) {
        this.rectF.left = 0;
        this.rectF.top = 0;
        this.rectF.right = width;
        this.rectF.bottom = height;
    }

    @Override
    public void draw(@NonNull Canvas canvas) {
        canvas.drawRoundRect(rectF, radius, radius, paint); // 画圆角矩形，现成的方法
    }

    @Override
    public void setAlpha(int i) {

    }

    @Override
    public void setColorFilter(@Nullable ColorFilter colorFilter) {

    }

    @Override
    public int getOpacity() {
        return 0;
    }
}
