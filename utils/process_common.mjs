import TurndownService from "turndown"

const turndownService = new TurndownService()

const regexSplitLongParagraph = /(.{1,80}[^\s]*)/gi

turndownService.addRule("paragraphLength", {
  filter: ["p"],
  replacement: function(text) {
    return (
      "\r\n" +
      text
        .match(regexSplitLongParagraph)
        .map(t => t.trim())
        .join("\r\n") +
      "\r\n"
    )
  }
})

export default turndownService
