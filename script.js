document.addEventListener("DOMContentLoaded", () => {
  // Initialize elements
  const markdownInput = document.getElementById("markdown-input");
  const bbcodeOutput = document.getElementById("bbcode-output");
  const convertBtn = document.getElementById("convert-btn");
  const previewBtn = document.getElementById("preview-btn");
  const helpBtn = document.getElementById("help-btn");
  const clearMarkdownBtn = document.getElementById("clear-markdown");
  const copyBbcodeBtn = document.getElementById("copy-bbcode");
  const previewModal = document.getElementById("preview-modal");
  const helpModal = document.getElementById("help-modal");
  const closePreviewBtn = document.getElementById("close-preview");
  const closeHelpBtn = document.getElementById("close-help");
  const previewContent = document.getElementById("preview-content");

  // Conversion rules
  const conversionRules = [
    // Headers
    { pattern: /^#\s(.+)$/gm, replace: "[h1]$1[/h1]" },
    { pattern: /^##\s(.+)$/gm, replace: "[h2]$1[/h2]" },
    { pattern: /^###\s(.+)$/gm, replace: "[h3]$1[/h3]" },

    // Text formatting
    { pattern: /\*\*(.+?)\*\*/g, replace: "[b]$1[/b]" }, // bold
    { pattern: /\*(.+?)\*/g, replace: "[i]$1[/i]" }, // italic
    { pattern: /~~(.+?)~~/g, replace: "[strike]$1[/strike]" }, // strikethrough

    // Links
    { pattern: /\[(.+?)\]\((.+?)\)/g, replace: "[url=$2]$1[/url]" },

    // Images
    { pattern: /!\[(.*?)\]\((.*?)\)/g, replace: "[img]$2[/img]" },

    // Lists
    { pattern: /^\s*\*\s(.+)$/gm, replace: "[*]$1" }, // unordered list items
    { pattern: /^\s*-\s(.+)$/gm, replace: "[*]$1" }, // unordered list items (alternative)
    { pattern: /^\s*\d+\.\s(.+)$/gm, replace: "[*]$1" }, // ordered list items

    // Wrap lists in Steam tags
    {
      pattern: /(\[\*\])(.+?)(?=\[\*\]|$)/gs,
      replace: "[list]\n$1$2\n[/list]",
    },
    // Code blocks (simple implementation)
    { pattern: /```([^`]+)```/gs, replace: "[code]\n$1\n[/code]" },
    { pattern: /`([^`]+)`/g, replace: "[code]$1[/code]" },

    // Blockquotes
    { pattern: /^>\s(.+)$/gm, replace: "[quote]$1[/quote]" },

    // Horizontal rule
    { pattern: /^---$/gm, replace: "[hr]" },

    // Line breaks (Steam preserves single line breaks)
    { pattern: /\n\n/g, replace: "\n" },
  ];

  // Convert Markdown to BBCode
  function convertToBBCode(markdown) {
    let bbcode = markdown;
    conversionRules.forEach((rule) => {
      bbcode = bbcode.replace(rule.pattern, rule.replace);
    });
    return bbcode;
  }

  // Event Listeners
  convertBtn.addEventListener("click", () => {
    const markdown = markdownInput.value;
    const bbcode = convertToBBCode(markdown);
    bbcodeOutput.textContent = bbcode;
  });
  previewBtn.addEventListener("click", () => {
    const markdown = markdownInput.value;
    const bbcode = convertToBBCode(markdown);

    // Create a temporary div to parse BBCode
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = bbcode
      .replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>")
      .replace(/\[i\](.*?)\[\/i\]/g, "<em>$1</em>")
      .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>")
      .replace(/\[strike\](.*?)\[\/strike\]/g, "<del>$1</del>")
      .replace(/\[h1\](.*?)\[\/h1\]/g, "<h1>$1</h1>")
      .replace(/\[h2\](.*?)\[\/h2\]/g, "<h2>$1</h2>")
      .replace(/\[h3\](.*?)\[\/h3\]/g, "<h3>$1</h3>")
      .replace(
        /\[url=(.*?)\](.*?)\[\/url\]/g,
        '<a href="$1" target="_blank">$2</a>'
      )
      .replace(
        /\[img\](.*?)\[\/img\]/g,
        '<img src="$1" alt="Image" style="max-width:100%;height:auto;">'
      )
      .replace(/\[list\](.*?)\[\/list\]/gs, "<ul>$1</ul>")
      .replace(/\[olist\](.*?)\[\/olist\]/gs, "<ol>$1</ol>")
      .replace(/\[\*\](.*?)(?=<|$)/gs, "<li>$1</li>")
      .replace(/\[code\](.*?)\[\/code\]/gs, "<pre><code>$1</code></pre>")
      .replace(/\[quote\](.*?)\[\/quote\]/gs, "<blockquote>$1</blockquote>")
      .replace(/\[hr\]/g, "<hr>");

    previewContent.innerHTML = tempDiv.innerHTML;
    previewModal.classList.remove("hidden");
  });
  helpBtn.addEventListener("click", () => {
    helpModal.classList.remove("hidden");
  });

  clearMarkdownBtn.addEventListener("click", () => {
    markdownInput.value = "";
    bbcodeOutput.textContent = "";
  });

  copyBbcodeBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(bbcodeOutput.textContent).then(() => {
      const originalIcon = copyBbcodeBtn.innerHTML;
      copyBbcodeBtn.innerHTML = '<i data-feather="check"></i>';
      setTimeout(() => {
        copyBbcodeBtn.innerHTML = originalIcon;
        feather.replace();
      }, 2000);
      feather.replace();
    });
  });

  closePreviewBtn.addEventListener("click", () => {
    previewModal.classList.add("hidden");
  });

  closeHelpBtn.addEventListener("click", () => {
    helpModal.classList.add("hidden");
  });

  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === previewModal) {
      previewModal.classList.add("hidden");
    }
    if (event.target === helpModal) {
      helpModal.classList.add("hidden");
    }
  });

  // Initialize with example text
  markdownInput.value = `# Welcome to SteamMark Magic Wand

This tool converts **Markdown** to Steam *BBCode*.

## Features
- Convert headers (#, ##, ###)
- Format text (*italic*, **bold**, ~~strikethrough~~)
- Create [links](https://example.com) and show images:
![example](https://static.photos/technology/320x240/1)

\`\`\`
// Even code blocks!
function example() {
    return "Hello, Steam!";
}
\`\`\`

> Blockquotes work too!

---
Enjoy!`;
});
