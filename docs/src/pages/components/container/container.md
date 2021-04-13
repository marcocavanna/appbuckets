# Container

<p class="description">The container centers your content horizontally. It's the most basic layout element.</p>

While containers can be nested, most layouts do not require a nested container.

## Fluid

A fluid container width is bounded by the `maxWidth` prop value.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false, "className": "container-demo"}}

```tsx
<Container fluid />
```

## Fixed

If you prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport, you can set the `fixed` prop. The max-width matches the min-width of the current breakpoint.

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false, "className": "container-demo"}}

```tsx
<Container fixedTo={'tablet'} />
```

## Props

### `<Container />`

{{"props": "Container"}}
