import { Component } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';

@Component({})
export default class TestView extends tsx.Component<{}> {
  private test = 1;
  private render() {
    return (
      <div class='test'>1111</div>
    )
  }
  private mounted() {
    console.log(this.test);
  }
}