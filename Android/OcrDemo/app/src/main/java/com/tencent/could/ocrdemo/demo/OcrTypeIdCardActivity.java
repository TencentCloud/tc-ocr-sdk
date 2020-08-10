package com.tencent.could.ocrdemo.demo;

import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;

import com.tencent.could.ocrdemo.R;
import com.tencent.could.ocrdemo.adapter.RecyclerAdapter;
import com.tencent.could.ocrdemo.adapter.ResultRecyclerAdapter;
import com.tencent.could.ocrdemo.components.ImageConvertUtil;
import com.tencent.could.ocrdemo.components.ToolBar;
import com.tencent.could.ocrdemo.model.CardItem;
import com.tencent.could.ocrdemo.model.IdCardInfo;
import com.tencent.could.ocrdemo.model.ResultItem;
import com.tencent.could.ocrdemo.model.SpaceItemDecoration;
import com.tencent.ocr.sdk.common.ISDKKitResultListener;
import com.tencent.ocr.sdk.common.OcrSDKKit;
import com.tencent.ocr.sdk.common.OcrType;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class OcrTypeIdCardActivity extends BaseActivity {

    private List<CardItem> itemData;

    private ToolBar typeToolBar;
    private RecyclerView recyclerView;
    private RecyclerAdapter adapter;
    private IdCardInfo idCardInfo = new IdCardInfo();
    private List<ResultItem> resultData = new ArrayList<>();
    private ResultRecyclerAdapter recyclerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ocr_id_card);
        initData();
        initView();
    }


    private void initData() {
        itemData = Arrays.asList(
                new CardItem(ImageConvertUtil.getBitmapFromVectorDrawable(this, R.drawable.ocr_id_card_icon), "身份证正面", "拍摄人像面"),
                new CardItem(ImageConvertUtil.getBitmapFromVectorDrawable(this, R.drawable.ocr_id_card_back_icon), "身份证反面", "拍摄国徽面"));
    }

    private void initView() {
        typeToolBar = findViewById(R.id.toolBar_idCard);
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
        recyclerView = findViewById(R.id.list_recycler_idCard);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.addItemDecoration(new SpaceItemDecoration(100, 50));
        adapter = new RecyclerAdapter(this, itemData, 2);
        adapter.setOnItemClickListener(new RecyclerAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(View view, int position) {
                if (position == 0) {  //身份证正面
                    //弹出界面
                    OcrSDKKit.getInstance().startProcessOcr(OcrTypeIdCardActivity.this, OcrType.IDCardOCR_FRONT, null,
                            new ISDKKitResultListener() {
                                @Override
                                public void onProcessSucceed(String response, String srcBase64Image, String requestId) {
                                    //popTip(response, "Succeed");
                                    IdCardInfo tempIdCardInfo = new Gson().fromJson(response, IdCardInfo.class);
                                    Log.e("response", tempIdCardInfo.getRequestId());
                                    Bitmap bitmap = ImageConvertUtil.base64ToBitmap(srcBase64Image);
                                    CardItem item0 = itemData.get(0);
                                    item0.setIconBitmap(bitmap);
                                    item0.setPlusComplete(true);
                                    itemData.set(0, item0);
                                    adapter.notifyDataChanged(itemData);

                                    idCardInfo.setAddress(tempIdCardInfo.getAddress());
                                    idCardInfo.setName(tempIdCardInfo.getName());
                                    idCardInfo.setNation(tempIdCardInfo.getNation());
                                    idCardInfo.setBirth(tempIdCardInfo.getBirth());
                                    idCardInfo.setSex(tempIdCardInfo.getSex());
                                    idCardInfo.setIdNum(tempIdCardInfo.getIdNum());
                                    setResultListData();
                                }

                                @Override
                                public void onProcessFailed(String errorCode, String message, String requestId) {
                                    popTip(errorCode, message);
                                    Log.e("requestId", requestId);
                                }
                            });
                } else { //身份证反面
                    OcrSDKKit.getInstance().startProcessOcr(OcrTypeIdCardActivity.this, OcrType.IDCardOCR_BACK, null,
                            new ISDKKitResultListener() {
                                @Override
                                public void onProcessSucceed(String response, String srcBase64Image, String requestId) {
                                    IdCardInfo tempIdCardInfo = new Gson().fromJson(response, IdCardInfo.class);
                                    Log.e("response", tempIdCardInfo.getRequestId());
                                    Bitmap bitmap = ImageConvertUtil.base64ToBitmap(srcBase64Image);
                                    CardItem item1 = itemData.get(1);
                                    item1.setIconBitmap(bitmap);
                                    item1.setPlusComplete(true);
                                    itemData.set(1, item1);
                                    adapter.notifyDataChanged(itemData);
                                    idCardInfo.setAuthority(tempIdCardInfo.getAuthority());
                                    idCardInfo.setValidDate(tempIdCardInfo.getValidDate());
                                    setResultListData();
                                }

                                @Override
                                public void onProcessFailed(String errorCode, String message, String requestId) {
                                    popTip(errorCode, message);
                                    Log.e("requestId", requestId);
                                }
                            });
                }
            }
        });
        recyclerView.setAdapter(adapter);
        resultData.clear();
        RecyclerView resultRecyclerView = findViewById(R.id.txy_idcard_recylerview);
        resultRecyclerView.setLayoutManager(new LinearLayoutManager(App.getApp()));
        recyclerAdapter = new ResultRecyclerAdapter(resultData);
        resultRecyclerView.setAdapter(recyclerAdapter);
    }

    private void popTip(String msg, String title) {
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

        androidx.appcompat.app.AlertDialog.Builder builder = new androidx.appcompat.app.AlertDialog.Builder(this);
        builder.setCustomTitle(titleTextView);
        builder.setView(contentView);
        builder.setCancelable(true);

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    private void setResultListData() {
        resultData.clear();
        // 添加正面信息
        if (idCardInfo.getName() != null && !idCardInfo.getName().isEmpty()) {
            resultData.add(new ResultItem("姓名", idCardInfo.getName()));
            resultData.add(new ResultItem("性别", idCardInfo.getSex()));
            resultData.add(new ResultItem("民族", idCardInfo.getNation()));
            resultData.add(new ResultItem("生日", idCardInfo.getBirth()));
            resultData.add(new ResultItem("地址", idCardInfo.getAddress()));
            resultData.add(new ResultItem("身份证号", idCardInfo.getIdNum()));
        }
        if (idCardInfo.getAuthority() != null && !idCardInfo.getAuthority().isEmpty()) {
            resultData.add(new ResultItem("发证机关", idCardInfo.getAuthority()));
            resultData.add(new ResultItem("有效期", idCardInfo.getValidDate()));
        }
        recyclerAdapter.updateResultData(resultData);
        recyclerAdapter.notifyDataSetChanged();
    }

    @Override
    public void finish() {
        super.finish();
        overridePendingTransition(R.anim.right_in, R.anim.right_out);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    public void completeClick(View view) {
        finish();
    }
}
