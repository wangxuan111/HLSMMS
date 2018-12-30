<template>
  <el-container id="home">
    <!-- 左边菜单 -->
    <leftMenu></leftMenu>

    <el-container id="mainContent">
      <!-- 右边顶部 -->
      <rightTop></rightTop>
      <!-- 右边中间 -->
      <el-main>
        <el-card class="box-card">
          <h3>分类管理</h3>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="分类名称" width="500">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.classname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="管理">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                  <i class="el-icon-edit"></i> 编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  <i class="el-icon-delete"></i> 删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-card>
      </el-main>
      <!-- 右侧底部 -->
      <rightBottom></rightBottom>
    </el-container>
  </el-container>
</template>

<script>
import leftMenu from "../components/leftMenu";
import rightTop from "../components/rightTop";
import rightBottom from "../components/rightBottom";
export default {
  data() {
    return {
        tableData: [{
          classname: '日用品',
        }, {
          classname: '舒肤佳',
        }, {
          classname: '食品',
        }, {
          classname: '烟酒',
        }]
      }
  },
  components: {
    // 注册组件
    leftMenu,
    rightTop,
    rightBottom
  }
};
</script>
<style scoped>
</style>

