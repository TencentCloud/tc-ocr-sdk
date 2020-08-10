package com.tencent.could.ocrdemo.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;


import com.tencent.could.ocrdemo.R;
import com.tencent.could.ocrdemo.model.ResultItem;

import java.util.List;

/**
 * 结果对应的adapter
 *
 * @since 2020/7/30
 */
public class ResultRecyclerAdapter extends RecyclerView.Adapter<ResultRecyclerAdapter.ResultViewHolder> {
    private List<ResultItem> resultData;

    /**
     * 通过构造函数传入数据
     *
     * @param resultData
     */
    public ResultRecyclerAdapter(List<ResultItem> resultData) {
        this.resultData = resultData;
    }

    /**
     * 刷新数据信息
     *
     * @param resultData 数据
     */
    public void updateResultData(List<ResultItem> resultData) {
        this.resultData = resultData;
    }

    @NonNull
    @Override
    public ResultViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.list_item_layout, parent, false);
        return new ResultViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ResultViewHolder holder, int position) {
        ResultItem resultItem = resultData.get(position);
        if (resultItem == null) {
            return;
        }
        holder.keyText.setText(resultItem.getKeyStr());
        holder.valueText.setText(resultItem.getValueStr());
    }

    @Override
    public int getItemCount() {
        return resultData.size();
    }


    /**
     * 内部class对应的类
     */
    public class ResultViewHolder extends RecyclerView.ViewHolder {
        public TextView keyText;
        public EditText valueText;

        public ResultViewHolder(@NonNull View itemView) {
            super(itemView);
            keyText = itemView.findViewById(R.id.name_tv);
            valueText = itemView.findViewById(R.id.value_et);
        }
    }
}
