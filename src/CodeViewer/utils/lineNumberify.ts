// based on https://github.com/FormidableLabs/prism-react-renderer
import { AST, RefractorNode } from 'refractor/core';

const newLineRegex = /\n/g;
function getNewLines(str: string) {
  return str.match(newLineRegex);
}

function createLineElement({
  children,
  lineNumber,
  className,
}: {
  children: RefractorNode[];
  lineNumber?: number;
  className?: string[];
}): AST.Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      className: lineNumber === void 0 ? className : ['line-number'],
    },
    children,
  };
}

function flattenCodeTree(tree: RefractorNode[], className: string[] = []): AST.Element[] {
  const newTree: AST.Element[] = [];
  for (const node of tree) {
    if (node.type === 'text') {
      newTree.push(
        createLineElement({
          children: [node],
          className,
        }),
      );
    } else if (node.children && node.properties.className !== void 0) {
      const classNames = className.concat(node.properties.className);
      newTree.push(...flattenCodeTree(node.children, classNames));
    }
  }

  return newTree;
}

export function lineNumberify(codeTree: RefractorNode[]): RefractorNode[] {
  const tree = flattenCodeTree(codeTree);
  const newTree = [];
  let lastLineBreakIndex = -1;
  let index = 0;

  while (index < tree.length) {
    const node = tree[index];
    const value = (node.children![0] as AST.Text).value!;
    const newLines = getNewLines(value);

    if (newLines) {
      const splitValue = value.split('\n');
      splitValue.forEach((text, i) => {
        const lineNumber = newTree.length + 1;
        const newChild: AST.Text = { type: 'text', value: `${text}\n` };

        if (i === 0) {
          const children = tree.slice(lastLineBreakIndex + 1, index).concat(
            createLineElement({
              children: [newChild],
              className: node.properties!.className,
            }),
          );
          newTree.push(createLineElement({ children, lineNumber }));
        } else if (i === splitValue.length - 1) {
          const stringChild = tree[index + 1] && tree[index + 1].children && tree[index + 1].children![0];
          if (stringChild) {
            const lastLineInPreviousSpan: AST.Text = { type: 'text', value: `${text}` };
            const newElem = createLineElement({
              children: [lastLineInPreviousSpan],
              className: node.properties!.className,
            });
            tree.splice(index + 1, 0, newElem);
          } else {
            newTree.push(
              createLineElement({
                children: [newChild],
                lineNumber,
                className: node.properties!.className,
              }),
            );
          }
        } else {
          newTree.push(
            createLineElement({
              children: [newChild],
              lineNumber,
              className: node.properties!.className,
            }),
          );
        }
      });

      lastLineBreakIndex = index;
    }
    index++;
  }

  if (lastLineBreakIndex !== tree.length - 1) {
    const children = tree.slice(lastLineBreakIndex + 1, tree.length);
    if (children && children.length) {
      newTree.push(
        createLineElement({
          children,
          lineNumber: newTree.length + 1,
        }),
      );
    }
  }

  return newTree;
}
