import * as cn from 'classnames';
import 'prismjs';
import * as React from 'react';

import { Classes } from '../classes';
import { astToReact } from './utils/astToReact';
import { parseCode } from './utils/parseCode';

const languageMaps: { [from: string]: string } = {
  md: 'markdown',
};

/**
 * CODE VIEWER
 */
interface ICodeViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  language?: string;
  showLineNumbers?: boolean;
  inline?: boolean;
}

const CodeViewer: React.FunctionComponent<ICodeViewerProps> = ({
  language,
  value,
  showLineNumbers = false,
  inline = false,
  className,
  ...rest
}) => {
  const lang = (language && languageMaps[language]) || language;

  if (inline) {
    return (
      <code
        className={cn(Classes.RUNNING_TEXT, Classes.CODE_BLOCK, Classes.CODE_EDITOR, className, {
          isInline: inline,
          showLineNumbers,
        })}
        {...rest}
      >
        {value}
      </code>
    );
  }

  const markup = parseCode(value, lang, showLineNumbers);

  return (
    <pre
      className={cn(Classes.RUNNING_TEXT, Classes.CODE_BLOCK, Classes.CODE_EDITOR, className, {
        isInline: inline,
        showLineNumbers,
      })}
      {...rest as React.HTMLAttributes<HTMLPreElement>}
    >
      {markup ? markup.map(astToReact()) : value}
    </pre>
  );
};

/**
 * EXPORTS
 */

export { CodeViewer, ICodeViewerProps };