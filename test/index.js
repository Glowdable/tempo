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
      firstName: 'Foo',
      lastName: 'Bar',
    }
  },
  computed: {
    fullName: function () {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  mounted() {
    setTimeout(() => {
      this.firstName = 'helen';
    }, 1000);
  },
  render: function(h) {
    return h('div', {}, this.fullName);
  },
}

