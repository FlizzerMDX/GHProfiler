import { ShadcnTemplate } from './index'

export function Editor() {
  return (
    <ShadcnTemplate
      onReady={(editor) => {
        console.log('Editor ready!')
        // Access editor methods here
        editor.injectMarkdown("# Hello World")
        // editor.injectHTML("<div>test</div>")
      }}
    />
  )
}