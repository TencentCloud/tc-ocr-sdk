package com.tencent.could.ocrdemo.model;

import android.graphics.Rect;
import android.view.View;

import androidx.recyclerview.widget.RecyclerView;

public class SpaceItemDecoration extends RecyclerView.ItemDecoration {
    private int mVerticalSpace;
    private int mhorizontalSpace;
    public SpaceItemDecoration(int verticalSpace, int horizontalSpace) {
        this.mVerticalSpace = verticalSpace;
        this.mhorizontalSpace = horizontalSpace;
    }
    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        super.getItemOffsets(outRect, view, parent, state);
        outRect.left = mhorizontalSpace;
        outRect.right = mhorizontalSpace;
        outRect.bottom = mVerticalSpace;
        if (parent.getChildAdapterPosition(view) == 0) {
            outRect.top = mVerticalSpace;
        }
    }

}
