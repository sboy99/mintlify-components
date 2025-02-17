import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactElement } from 'react';

import { CopyToClipboardResult } from '../utils/copyToClipboard';
import { getNodeText } from '../utils/getNodeText';
import { CopyToClipboardButton } from './CopyToClipboardButton';

export interface CodeBlockPropsBase {
  filename?: string;
  /**
   *  Color of the filename text and the border underneath it when content is being shown.
   */
  filenameColor?: string;
  /**
   * Background color for the tooltip saying `Click to Copy` when hovering the clipboard button.
   */
  tooltipColor?: string;
  /**
   * The callback function when a user clicks on the copied to clipboard button
   */
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
}

export type CodeBlockProps = CodeBlockPropsBase &
  Omit<ComponentPropsWithoutRef<'div'>, keyof CodeBlockPropsBase>;

export function CodeBlock({
  filename,
  filenameColor,
  tooltipColor,
  onCopied,
  children,
  className,
  ...props
}: CodeBlockProps) {
  const Button = (props: Partial<ComponentPropsWithoutRef<typeof CopyToClipboardButton>>) => (
    <CopyToClipboardButton
      textToCopy={getNodeText(children)}
      tooltipColor={tooltipColor ?? filenameColor}
      onCopied={onCopied}
      {...props}
    />
  );

  return (
    <div
      className={clsx('mt-5 mb-8 not-prose gray-frame', filename && 'pt-2', className)}
      {...props}
    >
      {filename ? (
        <CodeTabBar filename={filename} filenameColor={filenameColor}>
          <Button className={'relative'} />
        </CodeTabBar>
      ) : (
        <Button className="absolute top-5 right-5" />
      )}
      <div
        className="code-in-gray-frame children:!my-0 children:!shadow-none children:!bg-transparent"
        style={{ fontVariantLigatures: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Different from CodeGroup because we cannot use Headless UI's Tab component outside a Tab.Group
 * Styling should look the same though.
 */
function CodeTabBar({
  filename,
  filenameColor,
  children,
}: {
  filename: string;
  filenameColor?: string;
  children?: ReactElement;
}) {
  return (
    <div className="flex text-slate-400 text-xs leading-6">
      <div
        className="flex-none border-t border-b border-t-transparent px-4 py-1 flex items-center"
        style={{ color: filenameColor, borderBottomColor: filenameColor }}
      >
        {filename}
      </div>
      <div className="flex-auto flex items-center bg-codeblock-tabs border border-slate-500/30 rounded-t">
        {children && (
          <div className="flex-auto flex items-center justify-end px-4 space-x-4">{children}</div>
        )}
      </div>
    </div>
  );
}
