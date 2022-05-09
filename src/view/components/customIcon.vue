<template>
  <div class="customIcons">
    <el-card shadow="hover" class="subcard">
      <template #header>Element-Plus 图标 &lt;e-icon&gt;</template>
      <el-card class="sub">
        <el-alert title="elementIcon简单封装和之前一样用法" type="success">
        </el-alert>
        <pre>&lt;e-icon type="Sunny"&gt;&lt;/e-icon&gt;</pre>
        <e-icon type="Sunny"></e-icon>
      </el-card>
      <el-card class="sub">
        <el-alert title="大大大，上size" type="success">
        </el-alert>
        <pre>&lt;e-icon type="Sunny" size="32"&gt;&lt;/e-icon&gt;</pre>
        <e-icon type="Sunny" size="32"></e-icon>
      </el-card>
      <el-card class="sub">
        <el-alert title="太阳的颜色，加上color" type="success">
        </el-alert>
        <pre>&lt;e-icon type="Sunny" size="32" color="red"&gt;&lt;/e-icon&gt;</pre>
        <e-icon type="Sunny" size="32" color="red"></e-icon>
      </el-card>
    </el-card>
    <el-card shadow="hover" class="subcard">
      <template #header>iconfont 自定义图标 &lt;c-icon&gt;</template>
      <el-card class="sub">
        <el-alert title="iconfont自定义图标，assets/icons目录下" type="warning">
        </el-alert>
        <pre>&lt;c-icon type="smile"&gt;&lt;/c-icon&gt;</pre>
        <c-icon type="smile"></c-icon>
      </el-card>
      <el-card class="sub">
        <el-alert title="大大大，上size" type="warning">
        </el-alert>
        <pre>&lt;c-icon type="smile" size="32"&gt;&lt;/c-icon&gt;</pre>
        <c-icon type="smile" size="32"></c-icon>
      </el-card>
      <el-card class="sub">
        <el-alert title="小脸上点color" type="warning"></el-alert>
        <pre>&lt;c-icon type="smile" size="32" color="red"&gt;&lt;/c-icon&gt;</pre>
        <c-icon type="smile" size="32" color="red"></c-icon>
      </el-card>
    </el-card>

    <el-card shadow="hover" class="subcard">
      <template #header> 第三方图标库&lt;p-icon&gt;&nbsp;
        <el-link type="primary" href="https://iconpark.oceanengine.com/official" target="_blank">iconpark</el-link>
        &nbsp;
        <el-link type="primary" href="https://www.npmjs.com/package/@icon-park/vue-next" target="_blank">更多配置</el-link>
      </template>
      <el-card class="sub">
        <el-alert title="iconpark字节跳动图标，@icon-park/vue-next" type="error">
        </el-alert>
        <pre>&lt;p-icon type="user"&gt;&lt;/p-icon&gt;</pre>
        <p-icon type="user"></p-icon>
      </el-card>
      <el-card class="sub">
        <el-alert title="大大大，上size" type="error">
        </el-alert>
        <pre>&lt;p-icon type="user" size="32"&gt;&lt;/p-icon&gt;</pre>
        <p-icon type="user" size="32"></p-icon>
      </el-card>
      <el-card class="sub">
        <el-alert title="给你点颜色看看" type="error">
        </el-alert>
        <pre>&lt;p-icon type="user" size="32" color="red"&gt;&lt;/p-icon&gt;</pre>
        <p-icon type="user" size="32" color="red"></p-icon>
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