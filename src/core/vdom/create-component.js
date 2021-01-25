import { activeInstance } from '/src/core/instance/lifeCycle.js';
import VNode from './vnode.js';

export function createComponent (Ctor, data, context, children) {
  // 1. 构造子类(子组件)构造函数VueComponent
  const baseCtor = context.$options._base;
  // 子组件传入的options已经放在Ctor的静态属性上了, 如果后面new 这个Ctor的时候有传入了option，则要跟
  // 现在传入的Ctor做合并
  Ctor = baseCtor.extend(Ctor);

  data = data || {};

  // 2. 安装组件钩子函数 data.hooks
  mergeHooks(data);
  // 3. 实例化vnode
  // TODO: propsData, listeners, tag
  const { name } = Ctor.options;
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, children },
  );
  return vnode;
}

const componentVNodeHooks = {
  init (vnode) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // TODO: keepAlive
    } else {
      // 子组件的实例化就在这个时机执行
      // createComponentInstanceForVnode是用来生成parent
      // TODO: activeInstance
      const child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      // 组件的el为undefined
      // 这个时候child的$options多了几个属性(parent, parentVnode)
      child.$mount(undefined);
    }
  },
  destroy() {},
  insert() {},
  prepatch() {},
};

export function createComponentInstanceForVnode (vnode, parent) {
  const option = {
    _isComponent: true,
    _parentVnode: vnode,
    parent, // activeInstance当前激活的组件实例
  };
  // inlineTemplate 部分的逻辑省略,这里会执行vue的构造函数_init

  // 这里Ctor就是子组件的构造函数，vnode的父组件的虚拟node
  // 这里既然new调用的是子组件的构造函数，后面的init函数的vm就是Ctor了(HelloVue组件对象)
  // 这里其实是在递归子组件
  return new vnode.componentOptions.Ctor(option);
}

const hooksToMerge = Object.keys(componentVNodeHooks);

function mergeHook(one, two) {
  return function (a,b,c,d) {
    one(a,b,c,d);
    two(a,b,c,d);
  }
}

function mergeHooks(data) {
  const hooks = data.hooks || (data.hooks = {});
  for (let i = 0; i < hooksToMerge.length; i++) {
    const key = hooksToMerge[i];
    const fromParent = hooks[key];
    const our = componentVNodeHooks[key];
    hooks[key] = fromParent ? mergeHook(fromParent, ours) : our;
  }
} 