export const selectItems = (items, { text, maxMR, hideOwned, hideMastered }, { owned, mastered}) => {
  return items.filter(item => {
    const textMatch = item.name && (
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.slot.toLowerCase().includes(text.toLowerCase()) ||
      item.type.toLowerCase().includes(text.toLowerCase()) ||
      item.source.toLowerCase().includes(text.toLowerCase())
    )
    const mrMatch = maxMR ? (parseInt(item.mr) <= parseInt(maxMR)) : true
    const ownedMatch = hideOwned ? !owned.includes(item.id) : true
    const masteredMatch = hideMastered ? !mastered.includes(item.id) : true
    return textMatch && mrMatch && ownedMatch && masteredMatch
  })
}

export const sortItems = (items, sortBy) => {
  return items.sort((a, b) => {
    if(sortBy === 'categoryAsc') {
      return a.category > b.category ? 1 : (
        a.category < b.category ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'categoryDesc') {
      return b.category > a.category ? 1 : (
        b.category < a.category ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'slotAsc') {
      return a.slot > b.slot ? 1 : (
        a.slot < b.slot ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'slotDesc') {
      return b.slot > a.slot ? 1 : (
        b.slot < a.slot ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'nameAsc') {
      return a.name > b.name ? 1 : -1
    } else if(sortBy === 'nameDesc') {
      return b.name > a.name ? 1 : -1
    } else if(sortBy === 'typeAsc') {
      return a.type > b.type ? 1 : (
        a.type < b.type ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'typeDesc') {
      return b.type > a.type ? 1 : (
        b.type < a.type ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'mrAsc') {
      return parseInt(a.mr) > parseInt(b.mr) ? 1 : (
        parseInt(a.mr) < parseInt(b.mr) ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'mrDesc') {
      return parseInt(b.mr) > parseInt(a.mr) ? 1 : (
        parseInt(b.mr) < parseInt(a.mr) ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'sourceAsc') {
      return a.source > b.source ? 1 : (
        a.source < b.source ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else if(sortBy === 'sourceDesc') {
      return b.source > a.source ? 1 : (
        b.source < a.source ? -1 : (
          a.name > b.name ? 1 : -1
        )
      )
    } else {
      return a > b ? 1 : -1
    }
  })
}

export const filterItemsByCategory = (items, category) => {
  return items.filter(item => item.category === category)
}
