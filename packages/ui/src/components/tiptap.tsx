'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import * as React from 'react'

interface TiptapProps {
  content: string
  onChange: (content: string) => void
  onTitleChange?: (title: string) => void
}

export const Tiptap = ({ content, onChange, onTitleChange }: TiptapProps) => {
  const editor = useEditor({
    content,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    extensions: [StarterKit],
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())

      if (onTitleChange) {
        const json = editor.getJSON()
        let extractedTitle = ''

        // Try to find a heading (h1 or h2)
        const headingNode = json.content?.find(
          (node: any) =>
            node.type === 'heading' && (node.attrs.level === 1 || node.attrs.level === 2),
        )

        if (headingNode && headingNode.content && headingNode.content.length > 0) {
          extractedTitle = headingNode.content[0].text
        } else {
          // If no heading, take the first line of plain text
          const firstParagraph = json.content?.find((node: any) => node.type === 'paragraph')
          if (firstParagraph && firstParagraph.content && firstParagraph.content.length > 0) {
            extractedTitle = firstParagraph.content[0].text.split('\n')[0]
          }
        }
        onTitleChange(extractedTitle)
      }
    },
  })

  return <EditorContent editor={editor} />
}
