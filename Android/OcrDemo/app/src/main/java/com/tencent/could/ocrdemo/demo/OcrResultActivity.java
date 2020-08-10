package com.tencent.could.ocrdemo.demo;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.tencent.could.ocrdemo.R;
import com.tencent.could.ocrdemo.adapter.ResultRecyclerAdapter;
import com.tencent.could.ocrdemo.components.ImageConvertUtil;
import com.tencent.could.ocrdemo.components.SharedPreference;
import com.tencent.could.ocrdemo.components.ToolBar;
import com.tencent.could.ocrdemo.model.BankCardInfo;
import com.tencent.could.ocrdemo.model.BusinessInfo;
import com.tencent.could.ocrdemo.model.ResultItem;


import java.util.ArrayList;
import java.util.List;

public class OcrResultActivity extends BaseActivity {

    public static final String BANK_RESULT_RESP = "bank_result_response";
    public static final String BUSINESS_RESULT_RESP = "business_result_response";

    public static final String SRC_BASE64_Image = "src_base64_image";

    private ToolBar resultToolBar;
    private ImageView resultImageView;

    private Bitmap retBitmap;

    private List<ResultItem> resultData = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bank_ocr_result);
        initData();
        initView();
    }

    private void initData() {

        String bankResponse = SharedPreference.getString(BANK_RESULT_RESP, "", this);
        String businessResponse = SharedPreference.getString(BUSINESS_RESULT_RESP, "", this);
        String srcBase64Image = SharedPreference.getString(SRC_BASE64_Image, "", this);
        if (!srcBase64Image.isEmpty()) {
            retBitmap = ImageConvertUtil.base64ToBitmap(srcBase64Image);
        }
        if (!bankResponse.isEmpty()) {
            final BankCardInfo bankCardInfo = new Gson().fromJson(bankResponse, BankCardInfo.class);
            resultData.clear();
            resultData.add(new ResultItem("银行", bankCardInfo.getBankInfo()));
            resultData.add(new ResultItem("有效期", bankCardInfo.getValidDate()));
            resultData.add(new ResultItem("卡号", bankCardInfo.getCardNo()));
        } else if (!businessResponse.isEmpty()) {
            final BusinessInfo businessInfo = new Gson().fromJson(businessResponse, BusinessInfo.class);
            resultData.clear();
            for (final BusinessInfo.BusinessCardInfosBean bean : businessInfo.getBusinessCardInfos()) {
                resultData.add(new ResultItem(bean.getName(), bean.getValue()));
            }
        } else {
            Toast.makeText(this, "result is empty", Toast.LENGTH_SHORT).show();
        }
    }

    @SuppressLint("ClickableViewAccessibility")
    private void initView() {
        resultToolBar = findViewById(R.id.toolBar_bank);
        resultToolBar.setTitle("识别结果");
        resultToolBar.setClickListener(new ToolBar.TitleBarClick() {
            @Override
            public void onLeftClick() {
                finish();
            }

            @Override
            public void onRightClick() {

            }
        });
        RecyclerView recyclerView = findViewById(R.id.txy_result_recycler);
        ResultRecyclerAdapter adapter = new ResultRecyclerAdapter(resultData);
        recyclerView.setLayoutManager(new LinearLayoutManager(App.getApp()));
        recyclerView.setAdapter(adapter);
        resultImageView = findViewById(R.id.bank_result_image_view);
        if (retBitmap != null) {
            resultImageView.setBackground(ImageConvertUtil.BitmapToDrawable(retBitmap, this));
        }
    }

    @Override
    public void finish() {
        super.finish();
        overridePendingTransition(R.anim.right_in, R.anim.right_out);
    }

    public void completeClick(View view) {
        finish();
    }
}
