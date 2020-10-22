/**
 * Function to replace characters or strings by other.
 * @param {string} text String over the function will make the replace
 * @param {Array} toReplace Array with all the strings/characters to replace
 * @param {string} replaceBy String with the new string to put in the replace
 */

const replaceStrings = (text, toReplace, replaceBy = ' ') => toReplace.reduce((accum, string) => (
    accum.replaceAll(string, replaceBy)
), text)

export default replaceStrings