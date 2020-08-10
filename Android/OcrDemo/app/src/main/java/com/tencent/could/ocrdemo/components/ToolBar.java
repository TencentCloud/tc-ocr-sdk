package com.tencent.could.ocrdemo.components;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.tencent.could.ocrdemo.R;

public class ToolBar extends RelativeLayout implements View.OnClickListener {

    private TextView mLeftText;
    private ImageView mLeftImage;
    private TextView mRightText;
    private ImageView mRightImage;
    private TextView mTitle;

    public ToolBar(Context context) {
        super(context);
        initView();
    }

    public ToolBar(Context context, AttributeSet attrs) {
        super(context, attrs);
        initView();
        getAttrs(context, attrs);
    }

    public ToolBar(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView();
        getAttrs(context, attrs);
    }

    private void initView() {

        LayoutInflater layoutInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        assert layoutInflater != null;
        View root = layoutInflater.inflate(R.layout.tool_bar_layout, this);
        root.findViewById(R.id.avd_left_button).setOnClickListener(this);
        root.findViewById(R.id.avd_right_button).setOnClickListener(this);
        mLeftText = root.findViewById(R.id.avd_left_text);
        mRightText = root.findViewById(R.id.avd_right_text);
        mLeftImage = root.findViewById(R.id.avd_left_image);
        mRightImage = root.findViewById(R.id.avd_right_image);
        mTitle = root.findViewById(R.id.avd_bar_title);
    }

    private void getAttrs(Context context, AttributeSet attrs) {
        if (context == null) {
            return;
        }
        TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.ToolBarAttr);
        String mLeftString = ta.getString(R.styleable.ToolBarAttr_left_text);
        String mRightString = ta.getString(R.styleable.ToolBarAttr_right_text);
        String mTitleString = ta.getString(R.styleable.ToolBarAttr_bar_title);

        boolean leftImageVisible = ta.getBoolean(R.styleable.ToolBarAttr_left_image_visible, true);
        if (!leftImageVisible) {
            mLeftImage.setVisibility(GONE);
        }

        if (mTitleString != null) {
            mTitle.setText(mTitleString);
        } else {
            mTitle.setVisibility(INVISIBLE);
        }

        int mLeftImageId = ta.getResourceId(R.styleable.ToolBarAttr_left_image, 0);

        boolean rightImageVisible = ta.getBoolean(R.styleable.ToolBarAttr_right_image_visible, false);
        if (rightImageVisible) {
            mRightImage.setVisibility(VISIBLE);
        } else {
            mRightImage.setVisibility(GONE);
        }

        if (mRightString != null) {
            mRightText.setVisibility(VISIBLE);
            mRightText.setText(mRightString);
        } else {
            mRightText.setVisibility(GONE);
        }

        if (mLeftString != null) {
            mLeftText.setVisibility(VISIBLE);
            mLeftText.setText(mLeftString);
        } else {
            mLeftText.setVisibility(INVISIBLE);
        }

        if (mLeftImageId != 0) {
            mLeftImage.setImageDrawable(getResources().getDrawable(mLeftImageId));
        }
        ta.recycle();
    }


    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.avd_left_button) {
            if (mClick != null) {
                mClick.onLeftClick();
            }
        }

        if (view.getId() == R.id.avd_right_button) {
            if (mClick != null) {
                mClick.onRightClick();
            }
        }
    }

    public interface TitleBarClick {
        void onLeftClick();

        void onRightClick();
    }

    private TitleBarClick mClick;

    public void setClickListener(TitleBarClick click) {
        mClick = click;
    }

    public void setTitle(String title) {
        mTitle.setVisibility(VISIBLE);
        mTitle.setText(title);
    }

}
