<template>
  <div class="customIcons">
    <el-card shadow="hover" class="subcard">
      <template #header>Element-Plus 图标 &lt;v-icon&gt;</template>
      <el-card class="sub">
        <el-alert title="简单封装和之前一样用法" type="success" close-text="谢谢爸爸">
        </el-alert>
        <pre>&lt;v-icon type="Sunny"&gt;&lt;/v-icon&gt;</pre>
        <p>
          <v-icon type="Sunny"></v-icon>
        </p>
      </el-card>
      <el-card class="sub">
        <el-alert title="大大大，上size" type="success" close-text="哎呦，有点大">
        </el-alert>
        <pre>&lt;v-icon type="Sunny" :size="32"&gt;&lt;/v-icon&gt;</pre>
        <p>
          <v-icon type="Sunny" :size="32"></v-icon>
        </p>
      </el-card>
      <el-card class="sub">
        <el-alert title="太阳的颜色，加上color" type="success" close-text="这日又大又红">
        </el-alert>
        <pre>&lt;v-icon type="Sunny" :size="32" color="red"&gt;&lt;/v-icon&gt;</pre>
        <p>
          <v-icon type="Sunny" :size="32" color="red"></v-icon>
        </p>
      </el-card>
    </el-card>
    <el-card shadow="hover" class="subcard">
      <template #header>iconfont 自定义图标 &lt;c-icon&gt;</template>
      <el-card class="sub">
        <el-alert title="iconfont自定义图标，assets/icons目录下" type="warning" close-text="谢谢爸爸">
        </el-alert>
        <pre>&lt;c-icon type="smile"&gt;&lt;/c-icon&gt;</pre>
        <p>
          <c-icon type="smile"></c-icon>
        </p>
      </el-card>
      <el-card class="sub">
        <el-alert title="大大大，上size" type="warning" close-text="我的大脸盘子">
        </el-alert>
        <pre>&lt;c-icon type="smile" :size="32"&gt;&lt;/c-icon&gt;</pre>
        <p>
          <c-icon type="smile" :size="32"></c-icon>
        </p>
      </el-card>
      <el-card class="sub">
        <el-alert title="小脸上点color" type="warning" close-text="我的大脸盘子害羞了">
        </el-alert>
        <pre>&lt;c-icon type="smile" :size="32" color="red"&gt;&lt;/c-icon&gt;</pre>
        <p>
          <c-icon type="smile" :size="32" color="red"></c-icon>
        </p>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.customIcons {
  display: grid;

  pre {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    color: royalblue;
  }

  .el-card {
    margin: 10px;

    .el-card__body {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .subcard {
    .el-card__body {
      padding: 10px;

      .el-card.sub {
        width: 33%;

        .el-card__body {
          height: 150px;
          flex-flow: column nowrap;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>