import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [
      // { header: '1' },
      // { header: '2' }
    ],
    // [{ size: [] }],
    ["bold", "italic", "underline"],
    [
      { list: "ordered" },
      { list: "bullet" },
      // { indent: '-1' },
      // { indent: '+1' },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function QuillEditor({ onChange, value = "" }: any) {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);
  if (isFirstRender) {
    return null;
  }
  return (
    <QuillNoSSRWrapper
      modules={modules}
      formats={formats}
      theme="snow"
      value={value}
      onChange={(content, delta, source, editor) => {
        if (
          editor
            .getText()
            .replace(/<(.|\n)*?>/g, "")
            .trim().length === 0
        ) {
          // no content
          onChange("");
        } else {
          onChange(content);
        }
      }}
    />
  );
}
