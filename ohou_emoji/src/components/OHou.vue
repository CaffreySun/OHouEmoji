<template>
  <div id="ohou">
    <GithubIcon />
    <div class="header floatText">
      <b> {{ state.codebooksType }}噢吼 Emoji{{ state.codebooksType }} </b>
    </div>

    <OHouContent
      v-bind:codebooksType="state.codebooksType"
      v-on:update:Type="state.codebooksType = $event"
      v-bind:selectingType="state.selectingType"
      v-on:update:Selecting="state.selectingType = $event"
    />

    <div class="footer floatText">
      <b>提示：变身后的Emoji可以添加任意字符、文字，而不影响还原</b><br />
      ⚠️这不是加密工具，故无法保障您的数据安全，请谨慎使用⚠️<br />
      <b style="color: #f00">⚠️使用本工具进行非法活动，后果自负⚠️</b>
    </div>

    <TypeSelect
      v-bind:style="{ display: state.selectingType ? 'block' : 'none' }"
      v-bind:type="state.codebooksType"
      v-on:update:type="codebooksTypeChanged($event)"
    />
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import TypeSelect from "./TypeSelect.vue";
import GithubIcon from "./GithubIcon.vue";
import OHouContent from "./OHouContent.vue";

export default defineComponent({
  components: {
    TypeSelect,
    GithubIcon,
    OHouContent,
  },

  setup() {
    const state = reactive({
      selectingType: false,
      codebooksType: "🥳",
    });

    function codebooksTypeChanged(type: string) {
      state.selectingType = false;

      if (type == null) return;

      state.codebooksType = type;
    }

    return {
      state,
      codebooksTypeChanged,
    };
  },
});
</script>

<style>
#ohou {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.header {
  align-self: center;
  width: 20rem;
  margin-top: 0.8rem;
  height: 3rem;
  font-size: 2rem;
}

.footer {
  margin: 1rem 0rem 0.5rem 0rem;
  font-size: 0.7rem;
  width: 30rem;
  align-self: center;
}

.floatText {
  user-select: none;
  transition: 0.3s;
}

.floatText:hover {
  text-shadow: 0rem 0.5rem 1rem #ffcd00;
  transform: translateY(-0.2rem) scale(1.05);
}
</style>