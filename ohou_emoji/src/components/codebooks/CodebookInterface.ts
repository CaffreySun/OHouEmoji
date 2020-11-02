export default interface CodebookInterface {
    tag: string,
    scale: number,
    encryptCodebook: Map<String, Array<String>>,
    decryptCodebook: Map<String, String>
}
