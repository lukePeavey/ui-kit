import * as refractor from 'refractor/core';
import { lineNumberify } from './lineNumberify';

refractor.register(require('refractor/lang/bash'));
refractor.register(require('refractor/lang/c'));
refractor.register(require('refractor/lang/csharp'));
refractor.register(require('refractor/lang/diff'));
refractor.register(require('refractor/lang/git'));
refractor.register(require('refractor/lang/go'));
refractor.register(require('refractor/lang/graphql'));
refractor.register(require('refractor/lang/http'));
refractor.register(require('refractor/lang/java'));
refractor.register(require('refractor/lang/javascript'));
refractor.register(require('refractor/lang/json'));
refractor.register(require('refractor/lang/jsx'));
refractor.register(require('refractor/lang/markdown'));
refractor.register(require('refractor/lang/markup'));
refractor.register(require('refractor/lang/markup-templating'));
refractor.register(require('refractor/lang/objectivec'));
refractor.register(require('refractor/lang/ocaml'));
refractor.register(require('refractor/lang/php'));
refractor.register(require('refractor/lang/powershell'));
refractor.register(require('refractor/lang/protobuf'));
refractor.register(require('refractor/lang/python'));
refractor.register(require('refractor/lang/ruby'));
refractor.register(require('refractor/lang/sql'));
refractor.register(require('refractor/lang/swift'));
refractor.register(require('refractor/lang/typescript'));
refractor.register(require('refractor/lang/yaml'));

function parsePlainText(code: string): refractor.RefractorNode[] {
  return code.split('\n').map((value, i, arr) => ({
    type: 'element',
    tagName: 'span',
    properties: {},
    children: [
      {
        type: 'text',
        value: arr.length - 1 === i ? value : `${value}\n`,
      },
    ],
  }));
}

function safeParse(code: string, language?: string): refractor.RefractorNode[] {
  if (language) {
    try {
      return refractor.highlight(code, language);
    } catch (ex) {
      // let's fallback to plain text
    }
  }

  return parsePlainText(code);
}

export function parseCode(code: string, language?: string, addLineNumbers?: boolean) {
  try {
    const ast = safeParse(code, language);
    if (addLineNumbers) {
      return lineNumberify(ast);
    }

    return ast;
  } catch (ex) {
    return null;
  }
}
