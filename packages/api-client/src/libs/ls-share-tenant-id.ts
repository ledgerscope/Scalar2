export const shareTenantId = (activeExample: any, allExamples: any) => {
  const tenantIdHeaderName = 'ledgerscope-tenant-id'

  const lsTenantIdHeader = activeExample.parameters.headers.find((h: any) => h.key === tenantIdHeaderName)
  if (!lsTenantIdHeader) {
    return
  }
  const lsTenantId = lsTenantIdHeader.value

  const otherExamples = allExamples.filter((x: any) => x.uid !== activeExample.uid)
  otherExamples.forEach((otherExample: any) => {
    const otherTenantIdHeader = otherExample.parameters.headers.find((h: any) => h.key === tenantIdHeaderName)
    if (otherTenantIdHeader) {
      if (otherTenantIdHeader.value != lsTenantId) {
        otherTenantIdHeader.value = lsTenantId
      }
    }
  })
}
