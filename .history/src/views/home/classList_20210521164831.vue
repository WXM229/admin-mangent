<template>
  <div class="page">
    <div class="content">
      <div class="content_item">
        <a class="top-content" href="#">xxx</a>
        <div class="border"></div>
        <p>您存的</p>
        <span>37</span>
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
      <div class="content_item">
        <a class="top-content" href="#">xxx</a>
        <div class="border"></div>
        <p>您存的</p>
        <span>37</span>
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
      <div class="content_item">
        <a class="top-content" href="#">xxx</a>
        <div class="border"></div>
        <p>您存的</p>
        <span>37</span>
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
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.content {
  width: 100%;
  display: flex;
}
.content_item {
  flex: 1;
  width: 33%;
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
}
</style>