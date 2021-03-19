export const HelloChild = {
  name: 'HelloChild',
  render: function (createElement) {
    return createElement('div', {
      attrs: {
        id: 'HelloChild',
      },
      style: {
        border: '1px solid green',
      }
    }, 'HelloChild=====');
  },
};

export const HelloH = {
  name: 'HelloH',
  data() {
    return {
      hello: 'HelloVue',
    };
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.hello = '测试一下';
  //   }, 1000);
  // },
  render: function (createElement) {
    return createElement('h1', {
      attrs: {
        id: 'h',
      },
      style: {
        border: '1px solid blue',
      }
    }, this.hello);
  },
};

// export const Hello = {
//   name: 'Hello',
//   data() {
//     return {
//       childList: ['a', 'b', 'c', 'd', 'f', 'e'],
//     };
//   },
//   // ba
//   mounted() {
//     setTimeout(() => {
//       this.childList = ['a', 'c', 'd', 'b', 'g', 'e'];
//     }, 1000);
//   },
//   render: function(h) {
//     return h('ul', {
//     }, this.childList.map((child) => h('li', {key: child}, child)));
//   },
// };
export const Hello = {
  name: 'Hello',
  data() {
    return {
      a: 1,
      b: 2,
      c: 3,
    }
  },
  mounted() {
    setTimeout(() => {
      this.a = 'a';
      this.b = 'b';
      this.c = 'c';
    }, 1000);
  },
  render: function(h) {
    console.log('=====+++++');
    return h('ul', {}, [h('li', {}, this.a), h('li', {}, this.b), h('li', {}, this.c)]);
  },
}

