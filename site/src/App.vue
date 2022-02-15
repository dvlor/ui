<template>
  <header></header>
  <aside>
    <nav>
      <div class="menu">
        <div class="item on group">
          <div class="title">组件</div>
          <div class="sub-menu">
            <div class="item">
              <div class="title">
                <router-link to="/components/button">Button</router-link>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <router-link to="/components/icon">Icon</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div>
      <router-view />
    </div>
  </aside>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  font-family: 'Times New Roman', Georgia, Serif;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  > header {
    height: 64px;
    border-bottom: solid 1px #d9d9d9be;
    box-shadow: 0 0 5px 1px #d9d9d9;
  }
  > aside {
    flex: 1;
    // width: 1400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    padding-top: 30px;
    overflow: hidden;
    > nav {
      width: 320px;
      border-right: solid 1px #d9d9d9be;
      overflow: auto;
      .menu {
        .item {
          line-height: 48px;
          cursor: pointer;
          transition: all 0.3s;
          color: #333;
          font-size: 16px;
          &:not(.group):hover {
            background-color: #f9f9f9;
            color: #1890ff;
          }
          .on {
            color: #1890ff;
          }
          &:not(.group).on {
            border-right: solid 3px #1890ff;
          }

          a {
            text-transform: none;
            text-decoration: none;
            color: inherit;
          }
        }

        .item .title {
          padding-left: 20px;
        }
        .item .item .title {
          padding-left: 40px;
        }
      }
    }
    > div {
      padding: 0 20px;
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
