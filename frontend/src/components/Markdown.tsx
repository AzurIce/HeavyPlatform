import { Component, createMemo } from "solid-js"
import { createStore } from "solid-js/store";
import { Root } from "hast";
import { PluggableList, unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { VFile } from "vfile";
import { MarkdownRoot } from "./markdown/render";
import { html } from "property-information";

import { Options as TransformOptions } from "./markdown/types";

type CoreOptions = {
	children: string;
	renderingStrategy: "memo" | "reconcile";
};
type PluginOptions = {
	remarkPlugins: PluggableList;
	rehypePlugins: PluggableList;
};
type LayoutOptions = {
	class: string;
};

type SolidMarkdownOptions = CoreOptions &
	PluginOptions &
	LayoutOptions &
	// FilterOptions &
	TransformOptions;

const defaults: SolidMarkdownOptions = {
	renderingStrategy: "memo",
	remarkPlugins: [],
	rehypePlugins: [],
	class: "",
	// unwrapDisallowed: false,
	// disallowedElements: undefined,
	// allowedElements: undefined,
	// allowElement: undefined,
	children: "",
	sourcePos: false,
	rawSourcePos: false,
	skipHtml: false,
	includeElementIndex: false,
	transformLinkUri: null,
	transformImageUri: undefined,
	linkTarget: "_self",
	components: {},
};

const Markdown: Component<{mdContent: string}> = (props) => {
  const { mdContent } = props;


	const options: SolidMarkdownOptions = defaults;

  // const [node, setNode] = createStore<Root>({ type: "root", children: [] });

  const generateNode = createMemo(() => {
		const children = mdContent;
		const processor = unified()
			.use(remarkParse)
			.use([]) // remark plugins
			.use(remarkRehype, { allowDangerousHtml: true })
			.use([]) // rehypr plugins
			// .use(rehypeFilter, options);

		const file = new VFile();
    file.value = children;

		const hastNode = processor.runSync(processor.parse(file), file);

		if (hastNode.type !== "root") {
			throw new TypeError("Expected a `root` node");
		}

		return hastNode;
	});

  return <>
    <div>
      <MarkdownRoot
        context={{ options, schema: html, listDepth: 0 }}
        node={generateNode()}
      />
    </div>
  </>
}

export default Markdown;