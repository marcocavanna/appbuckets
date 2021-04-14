import * as React from 'react';


export default class NodeRegistry {

  nodes = new Map<React.RefObject<any> | null, Set<React.Component>>();

  add = (node: React.RefObject<any> | null, component: React.Component): void => {
    // If nodes exists, add the component
    if (this.nodes.has(node)) {
      const set = this.nodes.get(node);

      if (set) {
        set.add(component);
      }

      return;
    }

    // Create the new Set using component
    this.nodes.set(node, new Set([ component ]));
  };

  remove = (node: React.RefObject<any> | null, component: React.Component): void => {
    // If node doesn't exists, return
    if (!this.nodes.has(node)) {
      return;
    }

    const set = this.nodes.get(node);

    if (!set) {
      return;
    }

    // If component is last, remove the node
    if (set.size === 1) {
      this.nodes.delete(node);
      return;
    }

    set.delete(component);
  };

  emit = <E extends HTMLElement = HTMLElement>(
    node: React.RefObject<E> | null,
    callback: (node: React.RefObject<E> | null, components: Set<React.Component> | undefined) => void
  ) => {
    callback(node, this.nodes.get(node));
  };

}
