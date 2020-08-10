package com.tencent.could.ocrdemo.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.tencent.could.ocrdemo.R;
import com.tencent.could.ocrdemo.components.ImageConvertUtil;
import com.tencent.could.ocrdemo.model.CardItem;

import java.util.List;


public class RecyclerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<CardItem> mListData;
    private OnItemClickListener mOnItemClickListener;
    private int listItemXmlType;
    private Context mContext;

    public RecyclerAdapter(Context context, List<CardItem> mapList, int itemType) {
        mListData = mapList;
        listItemXmlType = itemType;
        mContext = context;
    }

    public void setOnItemClickListener(OnItemClickListener mOnItemClickListener) {
        this.mOnItemClickListener = mOnItemClickListener;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType) {
        View item;
        switch (listItemXmlType) {
            case 1: {
                item = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_type, viewGroup, false);
                break;
            }

            case 2: {
                item = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_id_card, viewGroup, false);
                break;
            }

            default: { // 0也是这个布局¬
                item = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_rv, viewGroup, false);
                break;
            }

        }
        return new MyViewHolder(item);
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, final int position) {
        CardItem cardItemData = mListData.get(position);
        MyViewHolder myViewHolder = (MyViewHolder) holder;
        myViewHolder.imageView.setBackground(ImageConvertUtil.BitmapToDrawable(cardItemData.getIconBitmap(), mContext));
        myViewHolder.title_tv.setText(cardItemData.getTitle());
        myViewHolder.desc_tv.setText(cardItemData.getDesc());
        if (listItemXmlType == 2) {
            if (cardItemData.getPlusComplete()) {
                myViewHolder.plusIcon.setBackground(mContext.getResources().getDrawable(R.drawable.ocr_id_card_complete));
            } else {
                myViewHolder.plusIcon.setBackground(mContext.getResources().getDrawable(R.drawable.ocr_id_card_plus));
            }
        }
        if (mOnItemClickListener != null) {
            holder.itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mOnItemClickListener.onItemClick(view, position);
                }
            });
        }
    }

    @Override
    public int getItemCount() {
        return mListData.size();
    }

    public void notifyDataChanged(List<CardItem> cardItemList) {
        this.mListData = cardItemList;
        notifyDataSetChanged();
    }

    public interface OnItemClickListener {
        void onItemClick(View view, int position);
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        private ImageView imageView;
        private ImageView plusIcon;
        private TextView title_tv;
        private TextView desc_tv;

        MyViewHolder(@NonNull View itemView) {
            super(itemView);
            imageView = itemView.findViewById(R.id.item_icon);
            plusIcon = itemView.findViewById(R.id.plus_img);
            title_tv = itemView.findViewById(R.id.item_title);
            desc_tv = itemView.findViewById(R.id.item_desc);
        }
    }

}
