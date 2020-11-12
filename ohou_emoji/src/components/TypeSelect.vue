<template>
  <div id="type_select" v-on:click="this.$emit('update:type', null)">
    <div
      class="type_select_cnt"
      v-bind:style="{ height: state.height + 'rem' }"
    >
      <div>
        <div class="type_sel_title">选择变身类型</div>
        <div
          v-for="(item, index) in codebooksType"
          :key="item"
          v-on:click="this.$emit('update:type', item)"
          class="type_sel_cnt"
          v-bind:style="{
            height: itemHeight + 'rem',
            'line-height': itemHeight + 'rem',
          }"
          v-bind:class="{
            last_type_cnt: index == codebooksType.length - 1,
            type_selected: type == codebooksType[index],
          }"
        >
          <div>{{ item + CodebookTypeTitle[index] + item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { CodebookType, CodebookTypeTitle } from "./codebooks/CodebookType";

export default defineComponent({
  props: {
    type: String,
  },

  setup() {
    const codebooksType = CodebookType;

    const itemHeight = 3;

    const state = reactive({
      title: "title",
      height: CodebookTypeTitle.length * itemHeight + 3.5,
    });

    return {
      state,
      codebooksType,
      CodebookTypeTitle,
      itemHeight,
    };
  },
});
</script>

<style>
#type_select {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  transition: 0.3s;
}

.type_select_cnt {
  position: absolute;
  box-sizing: content-box;
  left: 50%;
  top: 50%;
  width: 10rem;
  height: 13.5rem;
}

.type_select_cnt > div {
  position: relative;
  left: -50%;
  top: -50%;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0rem 0rem 3rem #aaa;
  overflow: hidden;
}

.type_sel_title {
  height: 1.4rem;
  padding: 0.8rem;
  border-bottom: 0.1rem solid #ddd;
  font-size: 0.9rem;
  color: #333;
}

.type_sel_cnt {
  height: 5rem;
  line-height: 5rem;
  border-bottom: 0.1rem solid #eee;
  background-color: #fff;
  font-size: 1rem;
  color: #333;
  transition: 0.3s;
}

.type_sel_cnt:hover {
  background-color: #ffdf5d;
  font-size: 1.2rem;
  color: #fff;
}

.type_sel_cnt > div:active {
  animation: 0.3s ease-out type_active_anim;
}

@keyframes type_active_anim {
  from，to {
    transform: none;
  }
  50% {
    transform: scale(0.8);
  }
}

.last_type_cnt {
  border-bottom: 0;
  height: 5.5rem;
}

.type_selected {
  background-color: #ffcd00;
  font-size: 1.2rem;
  color: #fff;
}
</style>