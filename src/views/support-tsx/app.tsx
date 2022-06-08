import { Component } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';
import  { Container } from 'typedi';
import styles from './app.module.less';

@Component
export default class TestView extends tsx.Component<{}> {
  private test = 1;
  created() {
    this.handleTestRequest()
  }
  private async handleTestRequest() {
    const result = await Container.get(MainService).getMain();
  }
  private render() {
    return (
      <div class={styles.test}>1111</div>
    )
  }
  private mounted() {
    console.log(this.test);
  }
}