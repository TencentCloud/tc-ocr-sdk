package com.tencent.could.ocrdemo.demo;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import com.tencent.could.ocrdemo.R;
import com.tencent.could.ocrdemo.adapter.RecyclerAdapter;
import com.tencent.could.ocrdemo.components.ImageConvertUtil;
import com.tencent.could.ocrdemo.components.SharedPreference;
import com.tencent.could.ocrdemo.components.ToolBar;
import com.tencent.could.ocrdemo.model.CardItem;
import com.tencent.could.ocrdemo.model.SecretPamera;
import com.tencent.could.ocrdemo.model.SpaceItemDecoration;
import com.tencent.could.ocrdemo.utils.CustomConfigUtil;
import com.tencent.ocr.sdk.common.ISDKKitResultListener;
import com.tencent.ocr.sdk.common.OcrModeType;
import com.tencent.ocr.sdk.common.OcrSDKConfig;
import com.tencent.ocr.sdk.common.OcrSDKKit;
import com.tencent.ocr.sdk.common.OcrType;


import java.util.Arrays;
import java.util.List;

public class OcrTypeActivity extends BaseActivity {

    private List<CardItem> cardItemData;
    private ToolBar typeToolBar;
    private RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ocr_type);
        initSdk();
        initData();
        initView();
    }

    private void initSdk() {
        /*
         * ModeType
         * 0 手动拍摄模式
         * 2 自动+手动模式（先使用自动捕获模式，超时后转为手动拍摄模式）
         */
        int ocrModeType = SharedPreference.getInt(SharedPreference.OCR_MODE_TYPE, 2, OcrTypeActivity.this);//0 手动 1 自动 2  自动
        OcrModeType modeType = OcrModeType.OCR_DETECT_AUTO_MANUAL;
        if (ocrModeType == 0) { // 手动捕获模式
            modeType = OcrModeType.OCR_DETECT_MANUAL;
        }
        if (ocrModeType == 2) { // 自动+手动捕获模式
            modeType = OcrModeType.OCR_DETECT_AUTO_MANUAL;
        }
        // 启动参数配置
        OcrType ocrType = OcrType.BankCardOCR; // 设置默认的业务识别，银行卡
        OcrSDKConfig configBuilder = OcrSDKConfig.newBuilder(SecretPamera.secretId, SecretPamera.secretKey, null)
                .OcrType(ocrType)
                .ModeType(modeType)
                .build();
        // 初始化SDK
        OcrSDKKit.getInstance().initWithConfig(this.getApplicationContext(), configBuilder);
    }

    private void initData() {
        cardItemData = Arrays.asList(
                new CardItem(ImageConvertUtil.getBitmapFromVectorDrawable(this, R.drawable.ocr_id_card_icon), "身份证", "识别身份证件"),
                new CardItem(ImageConvertUtil.getBitmapFromVectorDrawable(this, R.drawable.ocr_back_icon), "银行卡", "识别银行卡号码等"),
                new CardItem(ImageConvertUtil.getBitmapFromVectorDrawable(this, R.drawable.ocr_business_card_icon), "名片", "扫描名片识别内容"));
    }

    private void initView() {
        typeToolBar = findViewById(R.id.toolBar_type);
        String typeTitle = getIntent().getStringExtra("typeTitle");
        typeToolBar.setTitle(typeTitle);
        typeToolBar.setClickListener(new ToolBar.TitleBarClick() {
            @Override
            public void onLeftClick() {
                finish();
            }

            @Override
            public void onRightClick() {

            }
        });
        recyclerView = findViewById(R.id.list_recycler_type);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.addItemDecoration(new SpaceItemDecoration(100, 50));
        RecyclerAdapter adapter = new RecyclerAdapter(this, cardItemData, 1);
        adapter.setOnItemClickListener(new RecyclerAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(View view, int position) {
                switch (position) {
                    case 0: // 身份证
                        startIdCardTypeSelectPage(cardItemData.get(position).getTitle());
                        break;
                    case 1: // 银行卡
                        startBankOcrPress();
                        break;
                    case 2: // 名片
                        startBusinessCardPress();
                        break;
                    default:
                        break;
                }

            }
        });
        recyclerView.setAdapter(adapter);
    }

    /**
     * 启动选择身份证识别的界面
     *
     * @param title 标题信息
     */
    private void startIdCardTypeSelectPage(final String title) {
        Intent targetIntent = new Intent(OcrTypeActivity.this, OcrTypeIdCardActivity.class);
        targetIntent.putExtra("typeTitle", title);
        startActivity(targetIntent);
        overridePendingTransition(R.anim.left_in, R.anim.left_out);
    }

    /**
     * 启动识别银行卡信息
     */
    private void startBankOcrPress() {
        OcrSDKKit.getInstance().startProcessOcr(OcrTypeActivity.this, OcrType.BankCardOCR,
                CustomConfigUtil.getInstance().getCustomConfigUi(), new ISDKKitResultListener() {
                    @Override
                    public void onProcessSucceed(String response, String srcBase64Image, String requestId) {
                        Intent resultIntent = new Intent(OcrTypeActivity.this, OcrResultActivity.class);
                        SharedPreference.clear(OcrTypeActivity.this);
                        SharedPreference.putString(OcrResultActivity.BANK_RESULT_RESP, response, OcrTypeActivity.this);
                        SharedPreference.putString(OcrResultActivity.SRC_BASE64_Image, srcBase64Image, OcrTypeActivity.this);
                        startActivity(resultIntent);
                        overridePendingTransition(R.anim.left_in, R.anim.left_out);
                    }

                    @Override
                    public void onProcessFailed(String errorCode, String message, String requestId) {
                        popTips(errorCode, message);
                        Log.e("requestId", requestId);
                    }
                });
    }

    /**
     * 启动识别名片信息
     */
    private void startBusinessCardPress() {
        OcrSDKKit.getInstance().startProcessOcr(OcrTypeActivity.this, OcrType.BusinessCardOCR,
                CustomConfigUtil.getInstance().getCustomConfigUi(), new ISDKKitResultListener() {
                    @Override
                    public void onProcessSucceed(String response, String srcBase64Image, String requestId) {
                        Intent resultIntent = new Intent(OcrTypeActivity.this, OcrResultActivity.class);
                        SharedPreference.clear(OcrTypeActivity.this);
                        SharedPreference.putString(OcrResultActivity.BUSINESS_RESULT_RESP, response, OcrTypeActivity.this);
                        SharedPreference.putString(OcrResultActivity.SRC_BASE64_Image, srcBase64Image, OcrTypeActivity.this);
                        startActivity(resultIntent);
                        overridePendingTransition(R.anim.left_in, R.anim.left_out);
                    }

                    @Override
                    public void onProcessFailed(String errorCode, String message, String requestId) {
                        popTips(errorCode, message);
                        Log.e("requestId", requestId);
                    }
                });
    }

    private void popTips(String msg, String title) {
        String msgShow = "错误码：" + msg;
        TextView titleTextView = new TextView(this);
        titleTextView.setText(title);
        titleTextView.setPadding(10, 10, 10, 10);
        titleTextView.setGravity(Gravity.CENTER);
        titleTextView.setTextSize(20);
        titleTextView.setTextColor(Color.rgb(0, 0, 0));

        TextView contentView = new TextView(this);
        contentView.setText(msgShow);
        contentView.setPadding(10, 10, 10, 10);
        contentView.setGravity(Gravity.CENTER);
        contentView.setTextSize(15);

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setCustomTitle(titleTextView);
        builder.setView(contentView);
        builder.setCancelable(true);

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    @Override
    public void finish() {
        super.finish();
        overridePendingTransition(R.anim.right_in, R.anim.right_out);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        OcrSDKKit.getInstance().release();
    }
}
