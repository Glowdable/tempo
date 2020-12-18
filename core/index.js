// function _proxy(option) {
//   const {data, render} = option;
//   const that = this;
//   Object.keys(data).forEach(key => {
//     Object.defineProperty(that, key, {
//       get() {
//         return data[key];
//       },
//       set(newVal) {
//         data[key] = newVal;
//         render();
//       },
//     });
//   });
// }

class Vue {
  constructor(options) {
    this.$options = options;
    this._init(option);
    // _proxy.call(this, option);
    // this._data = option.data;
    // observer(this._data, option.render);
  }

  $mount(el) {
    const options = this.$options;
    if (!options.render) {
      let template = options.template;
      // TODO: compileToFunctions
      if (template) {
        const { render } = compileToFunctions(template);
        options.render = render;
      }
    }

    function mountComponent(vm, el) {
      const updateComponent = () => {
        // TODO: _update
        // TODO: _render
        vm._update(vm._render());
      };

      new Watcher(vm, updateComponent);
    }

    return mountComponent(this, el);
  }
}



Vue._init = function (option) {
  const vm = this;
  if (option.el) {
    vm.$mount(el);
  }
}

// function observer(data, cb) {
//   Object.keys(data).forEach((key) => defineReactive(data, key, data[key], cb));
// }

// function defineReactive(data, key, value, cb) {
//   const dep = new Dep();
//   Object.defineProperty(data, key, {
//     get() {
//       // 收集依赖
//       dep.addSub();
//       return value;
//     },
//     set(newVal) {
//       value = newVal;
//       dep.notify();
//       // cb(); // set的时候执行render
//     },
//   });
// }

// class Dep {
//   constructor() {
//     this.subs = [];
//   }
//   addSub(sub) {
//     this.subs.push(sub);
//   }
//   removeSub() {}
//   notify() {
//     this.subs.forEach((sub) => {
//       sub.update();
//     });
//   }
// }

const app = new Vue({
  el: '#app',
  data: {
    text: '标题',
    text2: '正文',
  },
  // render() {
  //   console.log('render======text==', this._data.text);
  // },
  template: `
    <div>
      <h2>{{text}}</h2>
      <p>{{text2}}</p>
    </div>
  `,
});
// app.text2 = 'test------';
// console.log('app.text2: ', app.text2);

// app.text 
