<template>
    <div class="help">
        帮助
    </div>
</template>
<style lang="less" scope>
    @import './app.less';
</style>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Container } from 'typedi';
import { MainService } from '../../services/mainService';

@Component
export default class HelpView extends Vue {
    mounted() {
      this.init()
    }
    private async init() {
      const result = await Container.get(MainService).getMain();
    }
}
</script>