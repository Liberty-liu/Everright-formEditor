class Region {
  constructor (data, config) {
    this.data = data
    this.config = config
    this.municipality = ['110000', '120000', '310000', '500000']
  }

  getProvince () {
    const result = []
    const {
      province_list: province
    } = this.data
    for (const key in province) {
      result.push({
        label: province[key],
        value: key
      })
    }
    return result
  }

  getCity (code) {
    const result = []
    const {
      city_list: city
    } = this.data
    for (const key in city) {
      if (code.slice(0, 2) === key.slice(0, 2)) {
        result.push({
          label: city[key],
          value: key
        })
      }
    }
    return result
  }

  getCounty (code) {
    const result = []
    const {
      county_list: county
    } = this.data
    for (const key in county) {
      if (code.slice(0, 4) === key.slice(0, 4)) {
        result.push({
          label: county[key],
          value: key
        })
      }
    }
    return result
  }

  getAll () {
    return this.getProvince().map(node0 => {
      if (this.config.selectType > 1) {
        if (this.config.isFilter && this.municipality.includes(node0.value)) {
          node0.children = this.getCounty(String(Number(node0.value) + (node0.value === '500000' ? 200 : 100)))
        } else {
          const children = this.getCity(node0.value)
          node0.children = children.map((node1) => {
            if (this.config.selectType > 2) {
              const children = this.getCounty(node1.value)
              if (children.length) {
                node1.children = children
              }
            }
            return node1
          })
        }
      }
      return node0
    })
  }
}
export default Region
