import marked from 'marked';

import prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-tsx';


/* --------
 * Hash Generator for Header Element
 * --
 * To properly generate hash for anchor tag
 * process have to assert that they are unique in the page
 * -------- */

type HashGenerated = Record<string, boolean>;

function makeUniqueHash(hash: string, uniquePool: HashGenerated, iteration: number = 1): string {
  const uniqueHash = iteration === 1 ? hash : `${hash}-${iteration}`;

  if (!uniquePool[uniqueHash]) {
    uniquePool[uniqueHash] = true;
    return uniqueHash;
  }

  return makeUniqueHash(hash, uniquePool, iteration + 1);
}

function textToHash(text: string, uniquePool: HashGenerated) {
  /** Return a unique hash */
  return makeUniqueHash(
    encodeURI(
      text
        // Transform to lowercase
        .toLowerCase()
        // Remove HTML if Present
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, '')
        // Remove Emoji
        .replace(
          /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])\uFE0F?/g,
          ''
        )
        // Replace Dashes
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    ),
    uniquePool
  );
}


/* --------
 * Parsing MD File
 * --
 * Get Meta properties and the content of any well-formatted
 * markdown file.
 * -------- */

type MarkdownMetaAndContent = { contents: string[], description?: string, title: string };

function getMarkdownMetaAndContent(markdown: string): MarkdownMetaAndContent {
  /** Get the markdown title, getting the first header at level 1 */
  const matches = markdown.match(/# (.*)[\r\n]/);

  if (!matches || !matches[1]) {
    throw new Error('Missing title in the page');
  }

  const title = matches[1];
  const description = markdown.match(/<p class="description">(.*)<\/p>/s)?.[1].trim();
  const contents = markdown
    // Remove the first header
    .replace(/# (.*)[\r\n]/, '')
    // Split using demo tag
    .split(/^{{("(?:demo|component|props)":[^}]*)}}$/gm)
    // Remove Empty Lines
    .filter((section) => !/^\s*$/.test(section));

  return {
    contents,
    description,
    title
  };
}


/* --------
 * Highlight Code
 * --
 * Code written into Markdown file must be correctly highlighted
 * using PrismJS and its language
 * -------- */

export function highlightCode(code: string, language: string) {
  let prismGrammar: prism.Grammar;

  switch (language) {
    case 'ts':
      prismGrammar = prism.languages.tsx;
      break;

    case 'js':
    case 'sh':
      prismGrammar = prism.languages.jsx;
      break;

    case 'diff':
      prismGrammar = { ...prism.languages.diff };
      // original `/^[-<].*$/m` matches lines starting with `<` which matches
      // <SomeComponent />
      // we will only use `-` as the deleted marker
      prismGrammar.deleted = /^[-].*$/m;
      break;

    default:
      prismGrammar = prism.languages[language];
      break;
  }

  if (!prismGrammar) {
    if (language) {
      throw new Error(`unsupported language: "${language}", "${code}"`);
    }
    else {
      prismGrammar = prism.languages.jsx;
    }
  }

  return prism.highlight(code, prismGrammar, language);
}


/* --------
 * Renderer
 * --
 * Create and wrap a function that will render the markdown content
 * formatting as well data inside each section.
 * The renderer will also populate the TOC array
 * -------- */
export type TOCElement = { children: TOCElement[], hash: string, level: number, text: string };

type RendererContext = { headingHashes: HashGenerated, toc: TOCElement[] };

function createRenderer(ctx: RendererContext): (markdown: string) => string {
  /** Get Context Data */
  const { headingHashes, toc } = ctx;

  /** Return the Render Function */
  return function render(markdown) {
    /** Create the renderer */
    const renderer = new marked.Renderer();

    /** Set heading renderer */
    renderer.heading = (content, level) => {
      /** Main title and small title doesn't need to have an anchor */
      if (level === 1 || level >= 4) {
        return `<h${level}>${content}</h${level}>`;
      }

      /** Get the hash */
      const hash = textToHash(content, headingHashes);

      const displayText = content.replace(/([^\s]\()/g, '$1&#8203;');

      if (level === 2) {
        toc.push({
          text    : displayText,
          level,
          hash,
          children: []
        });
      }
      else if (level === 3) {
        if (!toc[toc.length - 1]) {
          throw new Error(`Missing parent level for: ${content}`);
        }

        toc[toc.length - 1].children.push({
          text    : displayText,
          level,
          hash,
          children: []
        });
      }

      return [
        `<h${level}>`,
        `<a class="anchor-link" id=${hash}></a>`,
        content,
        `<a class="anchor-link-style" aria-hidden="true" href="#${hash}">`,
        '</a>',
        `</h${level}>`
      ].join('');
    };

    /** Return the Marked Document */
    return marked(markdown, {
      gfm        : true,
      breaks     : false,
      pedantic   : false,
      sanitize   : false,
      smartLists : true,
      smartypants: false,
      highlight  : highlightCode,
      renderer
    });
  };
}


/* --------
 * Prepare the Markdown
 * --
 * The main exported function will prepare
 * the markdown to be rendered and it will
 * include any other row code from .tsx and .js file
 * into the markdown directory
 * -------- */

type PrepareMarkdownContext = {
  pageFilename: string,
  requireRaw: __WebpackModuleApi.RequireContext
};

export type DemoOptions = {
  className?: string,
  defaultCodeOpen?: boolean,
  demo: string,
  height?: number | string,
  iframe?: boolean,
  maxWidth?: number | string
};

export type PropsOptions = {
  props: string
};

export type ComponentsDoc = {
  filename: string,
  tags: Record<string, string>,
  description: string,
  displayName: string,
  props: Record<string, ComponentProp>
};

export type ComponentProp = {
  defaultValue: any,
  description?: string | null,
  name: string,
  parent: {
    fileName: string,
    name: string
  },
  declarations: {
    fileName: string,
    name: string
  }[],
  required: boolean,
  type: {
    name: string,
    raw?: string,
    value?: { value: string }[]
  }
};

export type DocumentedComponents = Record<string, ComponentsDoc>;

export type Demo = { module: string, moduleTS?: string, raw: string, rawTS?: string };

type Demos = Record<string, Demo>;

type RenderedSections = Array<string | DemoOptions | PropsOptions | null>;

type Doc = { description?: string, location: string, rendered: RenderedSections, toc: TOCElement[], title: string };

export type PreparedMarkdown = { demos: Demos, doc: Doc, documentedComponents: DocumentedComponents };

export function prepareMarkdown(ctx: PrepareMarkdownContext): PreparedMarkdown {
  /** Get data from context */
  const { pageFilename, requireRaw } = ctx;

  /** Initialize the Demos Object and the unique hash pool */
  let doc: Doc;
  const demos: Demos = {};
  const props: DocumentedComponents = {};

  const uniqueHashPool: HashGenerated = {};

  /** Loop each file into the folder */
  requireRaw.keys().forEach((filename) => {
    /** Add props */
    if (filename.match(/props\/.+\.json$/)) {
      try {
        const jsonContent = requireRaw(filename).default || requireRaw(filename);
        const propsContent = JSON.parse(jsonContent) as ComponentsDoc;
        props[propsContent.displayName] = propsContent;
      }
      catch (error) {
        global.console.error('JSON.parse fails with: ', `{${filename}}`);
        global.console.error(error);
      }
    }
    /** Add TSX Demos */
    else if (filename.match(/\.tsx$/)) {
      const demoName = `pages/${pageFilename}/${filename
        .replace(/\.\//g, '')
        .replace(/\.tsx/g, '.js')}`;

      demos[demoName] = {
        ...demos[demoName],
        moduleTS: filename,
        rawTS   : requireRaw(filename).default || requireRaw(filename)
      };
    }
    /** Add JS Demos */
    else if (filename.match(/\.js$/)) {
      const demoName = `pages/${pageFilename}/${filename.replace(/\.\//g, '')}`;

      demos[demoName] = {
        ...demos[demoName],
        module: filename,
        raw   : requireRaw(filename).default || requireRaw(filename)
      };
    }
    /** Parse the Markdown file */
    else if (filename.match(/\.mdx?$/)) {
      /** Get the file content */
      const markdown: string | undefined = requireRaw(filename).default || requireRaw(filename);

      if (typeof markdown !== 'string') {
        throw new Error(`Invalid .md file import at '${filename}'`);
      }

      /** Get markdown meta */
      const { contents, description, title } = getMarkdownMetaAndContent(markdown);

      /** Init the TOC elements array */
      const toc: TOCElement[] = [];

      /** Get the render function */
      const render = createRenderer({ headingHashes: uniqueHashPool, toc });

      /** Loop each content section to render each part */
      const renderedSections: RenderedSections = contents.map((section) => {
        /** If section is a Demo or a Component placeholder, parse the JSON string */
        if (/^"(demo|component|props)": "(.*)"/.test(section)) {
          try {
            return JSON.parse(`{${section}}`) as (DemoOptions | PropsOptions);
          }
          catch (err) {
            global.console.error('JSON.parse fails with: ', `{${section}}`);
            global.console.error(err);
            return null;
          }
        }

        /** Render the text */
        return render(section);
      });

      doc = {
        description,
        location: `src/pages/${pageFilename}/${filename}`,
        rendered: renderedSections,
        toc,
        title
      };
    }
  });

  /** Loop each JSON File */
  // requireProps.keys().forEach((filename) => {
  //   /** Get the props file content */
  //   try {
  //     console.log(requireProps);
  //     const content = require.resolve(requireProps.resolve(filename));
  //     console.log(content);
  //     // const propsContent = JSON.parse(requireProps(filename).default) as PropsDoc;
  //     // props[propsContent.displayName] = propsContent;
  //   }
  //   catch (error) {
  //     global.console.error('JSON.parse fails with: ', `{${filename}}`);
  //     global.console.error(error);
  //   }
  // });

  return { demos, doc: doc!, documentedComponents: props };
}
