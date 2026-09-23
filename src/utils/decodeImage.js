export function decodeBase64Image(encodedText, mimeType) {
  const binary = window.atob(encodedText.trim())
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return URL.createObjectURL(new Blob([bytes], { type: mimeType }))
}
