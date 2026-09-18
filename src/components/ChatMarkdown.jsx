import ReactMarkdown from "react-markdown";

// AI yanıtlarını zengin biçimde (kalın, listeler, bağlantılar) renders eder.
export default function ChatMarkdown({ text }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="mb-2 last:mb-0 list-disc pl-4 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="mb-2 last:mb-0 list-decimal pl-4 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => <strong className="text-primary font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic text-foreground/70">{children}</em>,
        a: ({ href, children }) => (
          <a href={href} className="text-primary underline underline-offset-2" target="_blank" rel="noreferrer">
            {children}
          </a>
        ),
        code: ({ children }) => <code className="text-primary font-mono">{children}</code>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}