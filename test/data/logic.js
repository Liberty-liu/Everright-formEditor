export const dels = [
  {
    visible: [
      {
        ifRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'equal',
                  property: '6FobSGWf9gFBgK0MS7a3E',
                  dateOperator: 'date',
                  value: {
                    dateType: 'static',
                    value: '1682870400'
                  }
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        },
        thenRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'field',
                  property: 'show',
                  value: [
                    'NLSfG6qSkyzXWfL82rW0E'
                  ]
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        }
      },
      {
        ifRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'equal',
                  property: '6FobSGWf9gFBgK0MS7a3E',
                  dateOperator: 'date',
                  value: {
                    dateType: 'static',
                    value: '1683129600'
                  }
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        },
        thenRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'field',
                  property: 'show',
                  value: [
                    '315WAA5x2C6VvvL7kM1pF'
                  ]
                },
                {
                  operator: 'field',
                  property: 'show',
                  value: [
                    '315WAA5x2C6VvvL7kM1pF'
                  ]
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        }
      }
    ],
    required: [
      {
        ifRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'equal',
                  property: '6FobSGWf9gFBgK0MS7a3E',
                  dateOperator: 'date',
                  value: {
                    dateType: 'static',
                    value: '1683648000'
                  }
                },
                {
                  operator: 'equal',
                  property: 'NLSfG6qSkyzXWfL82rW0E',
                  dateOperator: 'date',
                  value: {
                    dateType: 'static',
                    value: [
                      '1685116800'
                    ]
                  }
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        },
        thenRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'required',
                  property: 'required',
                  value: [
                    '315WAA5x2C6VvvL7kM1pF'
                  ]
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        }
      },
      {
        ifRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'equal',
                  property: 'NLSfG6qSkyzXWfL82rW0E',
                  dateOperator: 'date',
                  value: {
                    dateType: 'static',
                    value: [
                      '1683043200'
                    ]
                  }
                },
                {
                  operator: 'equal',
                  property: '6FobSGWf9gFBgK0MS7a3E',
                  dateOperator: 'date',
                  value: {
                    dateType: 'static',
                    value: '1683907200'
                  }
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        },
        thenRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'required',
                  property: 'required',
                  value: [
                    '315WAA5x2C6VvvL7kM1pF'
                  ]
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        }
      }
    ],
    readOnly: [
      {
        ifRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'equal',
                  property: '6FobSGWf9gFBgK0MS7a3E',
                  dateOperator: 'date',
                  value: {
                    dateType: 'static',
                    value: '1682956800'
                  }
                },
                {
                  operator: 'equal',
                  property: '6FobSGWf9gFBgK0MS7a3E',
                  dateOperator: 'date',
                  value: {
                    dateType: 'static',
                    value: '1684512000'
                  }
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        },
        thenRules: {
          filters: [
            {
              conditions: [
                {
                  operator: 'readOnly',
                  property: 'readOnly',
                  value: [
                    'NLSfG6qSkyzXWfL82rW0E'
                  ]
                },
                {
                  operator: 'readOnly',
                  property: 'readOnly',
                  value: [
                    '3EnU8Uc7e7gjyt0I_wkAl',
                    '315WAA5x2C6VvvL7kM1pF'
                  ]
                },
                {
                  operator: 'readOnly',
                  property: 'readOnly',
                  value: [
                    '3EnU8Uc7e7gjyt0I_wkAl'
                  ]
                }
              ],
              logicalOperator: 'and'
            }
          ],
          logicalOperator: 'and'
        }
      }
    ]
  }
]
