import React, { JSX } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }): JSX.Element => {
  if (!content) return <></>;



  return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>;
};

