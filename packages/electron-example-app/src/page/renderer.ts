
const setButton = document.getElementById('btn') as any 
const titleInput = document.getElementById('title') as any
const codeBlock = document.getElementById('codeBlock') as any

const log = (message: string) => {
    codeBlock.innerText = codeBlock.innerText + '\n' + message
}

setButton.addEventListener('click', () => {
    const title = titleInput.value
    log(`Setting title to ${title}`)
    window.electronAPI.setTitle(title)
});