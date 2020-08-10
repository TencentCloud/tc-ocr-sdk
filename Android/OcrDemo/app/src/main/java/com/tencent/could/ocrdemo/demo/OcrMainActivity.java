package com.tencent.could.ocrdemo.demo;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import com.tencent.could.ocrdemo.R;
import com.tencent.could.ocrdemo.adapter.RecyclerAdapter;
import com.tencent.could.ocrdemo.components.ImageConvertUtil;
import com.tencent.could.ocrdemo.components.SharedPreference;
import com.tencent.could.ocrdemo.model.CardItem;
import com.tencent.could.ocrdemo.model.SpaceItemDecoration;

import java.util.Arrays;
import java.util.List;

public class OcrMainActivity extends BaseActivity {
    private static final String TAG = "OcrMainActivity";
    private List<CardItem> cardItemData;
    private RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ocr_main);
        initData();
        initView();
    }

    private void initData() {
        cardItemData = Arrays.asList(
                new CardItem(ImageConvertUtil.getBitmapFromVectorDrawable(this, R.drawable.auto_distinguish), "自动识别模式", "无需点击拍照，系统补捉到证件自动识别"),
                new CardItem(ImageConvertUtil.getBitmapFromVectorDrawable(this, R.drawable.take_pictures), "拍照识别模式", "点击拍照后，系统再进行识别"));
    }

    private void initView() {
        recyclerView = findViewById(R.id.list_recycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.addItemDecoration(new SpaceItemDecoration(100, 100));
        RecyclerAdapter adapter = new RecyclerAdapter(this, cardItemData, 0);
        adapter.setOnItemClickListener(new RecyclerAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(View view, int position) {
                int modeType = position == 0 ? 2 : 0;
                SharedPreference.putInt(SharedPreference.OCR_MODE_TYPE, modeType, OcrMainActivity.this);
                Intent intent = new Intent(OcrMainActivity.this, OcrTypeActivity.class);
                intent.putExtra("typeTitle", cardItemData.get(position).getTitle());
                startActivity(intent);
                overridePendingTransition(R.anim.left_in, R.anim.left_out);
            }
        });
        recyclerView.setAdapter(adapter);
    }
}
