const toPlainSubscription = (subscription) => {
  if (!subscription) return {}
  if (typeof subscription.toObject === 'function') return subscription.toObject()
  return { ...subscription }
}

const buildSubscription = (subscription, baseSubscription) => {
  const nextSubscription = {
    ...toPlainSubscription(baseSubscription),
    ...toPlainSubscription(subscription)
  }

  if (!Object.keys(nextSubscription).length) return undefined

  if (nextSubscription.start_date) {
    nextSubscription.start_date = new Date(nextSubscription.start_date)
  }

  if (nextSubscription.days !== undefined && nextSubscription.start_date instanceof Date && !isNaN(nextSubscription.start_date)) {
    const expire = new Date(nextSubscription.start_date)
    expire.setDate(expire.getDate() + nextSubscription.days)

    nextSubscription.expire_date = expire
    nextSubscription.isActive = new Date() < expire
  }

  return nextSubscription
}

module.exports = buildSubscription
