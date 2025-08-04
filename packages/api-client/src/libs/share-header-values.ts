/* We persist/share some header values across all method calls, e.g. the tenantId
 * This is done with this class, and controlled by the sharedHeaders configuration setting. */
export const shareHeaderValues = (sharedHeaders: string[] | undefined, activeExample: any, allExamples: any) => {
  if (!sharedHeaders || sharedHeaders.length === 0) {
    // No headers want persisting
    return
  }

  const myUid = activeExample.uid
  const otherExamples = allExamples.filter((e: any) => e[0] !== myUid)
  if (otherExamples.length === 0) {
    return
  }

  sharedHeaders.forEach((headerName) => {
    const matchingHeaders = getMatchingHeaders(activeExample.parameters.headers, headerName)
    matchingHeaders.forEach((matchingHeader) => {
      otherExamples.forEach((otherExample: any) => {
        otherExample[1].parameters.headers.forEach((otherExampleHeader: any) => {
          if (otherExampleHeader.key === matchingHeader.key) {
            if (otherExampleHeader.value !== matchingHeader.value) {
              otherExampleHeader.value = matchingHeader.value
            }
          }
        })
      })
    })
  })
}

function getMatchingHeaders(headers: { value: string; key: string }[], headerName: string) {
  if (headerName.startsWith('*')) {
    if (headerName.endsWith('*')) {
      const needle = headerName.substring(1, headerName.length - 1)
      // console.log(`Looking for headers where key contains '${needle}'`)
      return headers.filter((h) => h.key.includes(needle))
    }
    const needle = headerName.substring(1, headerName.length)
    // console.log(`Looking for headers where key ends with '${needle}'`)
    return headers.filter((h) => h.key.endsWith(needle))
  }

  if (headerName.endsWith('*')) {
    const needle = headerName.substring(0, headerName.length - 1)
    // console.log(`Looking for headers where key starts with '${needle}'`)
    return headers.filter((h) => h.key.startsWith(needle))
  }

  const needle = headerName
  // console.log(`Looking for headers where key is '${needle}'`)
  return headers.filter((h) => h.key === needle)
}
