<template>
  <div class="video-box">
    <div class="video-top">
    </div>
    <div class="video-main">
      <div class="video-data">
        <el-table :data="tableData" class="tableBox" stripe style="width: 100%;height: 100%">
          <el-table-column prop="title" label="视频名"></el-table-column>
          <el-table-column prop="date" label="上传日期" width="150"></el-table-column>
          <el-table-column prop="uploader" label="上传者" width="150"></el-table-column>
          <el-table-column prop="size" label="大小" width="150"></el-table-column>
          <el-table-column label="操作" width="150">
            <template>
              <el-button type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-02",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-04",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-01",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-08",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-06",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-07",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-07",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-07",
          uploader: "王小虎",
          size: "1000.5MB"
        },
        {
          date: "2016-05-07",
          uploader: "王小虎",
          size: "1000.5MB"
        }
      ]
    };
  }
};
</script>

<style lang="scss" >
.video-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .video-top {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  .video-main {
    flex: 1;
    .video-data {
      margin-bottom: 20px;
      .tableBox {
        th {
          padding: 0;
          height: 60px;
        }
        td {
          padding: 0;
          height: 60px;
        }
      }
    }
  }
}
</style>
