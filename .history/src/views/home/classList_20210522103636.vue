<template>
  <div class="page">
    <div class="content">
      <div v-for="(item, index) in list" :key="index" class="content_item">
        <a class="top-content" href="#">xxxxxxx系统</a>
        <div class="content-top">
          <div class="content-top-item">
            <div class="border"></div>
            <p>您存的</p>
            <span>{{ item.id }}</span>
            <div class="content-center">
              <div class="content-center-top"></div>
            </div>
            <div class="content-border">
              <div class="content-border-item"></div>
              <div class="content-border-item"></div>
              <div class="content-border-item"></div>
            </div>
            <div class="content-bottom">
              <div class="content-bottom-item">
                <div>穿透类</div>
                <div>5</div>
              </div>
              <div class="content-bottom-item">
                <div>支付类</div>
                <div>5</div>
              </div>
              <div class="content-bottom-item">
                <div>支付类</div>
                <div>5</div>
              </div>
            </div>
          </div>
          <div class="content-top-item">
            <div class="border"></div>
            <p>您存的</p>
            <span>{{ item.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
      ],
    };
  },
};
</script>

<style>
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.content_item {
  flex: 1;
  min-width: 30%;
  max-width: 30%;
  height: 300px;
  background: #ffffff;
  border-radius: 20px;
  padding: 1px;
  margin: 10px;
}
.top-content {
  margin-top: 15px;
  display: block;
  font-size: 30px;
  text-align: center;
}
.content-top {
  text-align: center;
  display: flex;
}
.content-top-item {
  flex: 1;
  display: inline-block;
}
.content-top-items {
  /* flex: 1; */
  display: inline-block;
  padding-left: 20px;
}
.border {
  width: 1px;
  height: 30px;
  background: #cccccc;
  margin: 0 auto;
}
p {
  color: red;
  margin-top: 5px;
}
.content-center {
  padding: 1px;
  margin-top: 10px;
}
.content-center-top {
  width: 67%;
  height: 1px;
  background: #cccccc;
  margin: 0 auto;
}
.content-border {
  display: flex;
  margin-top: -6px;
}
.content-border-item {
  width: 1px;
  height: 20px;
  background: #cccccc;
  margin: 5px auto;
}
.content-bottom {
  display: flex;
  color: red;
}
.content-bottom-item {
  flex: 1;
  text-align: center;
}
</style>