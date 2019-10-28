
const setupPagination = (repo, ...methods) => {
    
  const overridenMethods = {}

  for (var method of methods) {

      overridenMethods[method] = (paginationOptions = {}, ...args) => {
          const {
              pageIndex = 0,
              pageSize = 10,
          } = paginationOptions

          const promises = {
              fetch: repo[method].call(repo, args).skip(pageIndex * pageSize).limit(pageSize),
              count:  repo[method].call(repo, args).countDocuments()
          }
          
          return Promise.all(Object.values(promises)).then(([data, count]) => {               
              return {
                  data: data,
                  page: pageIndex,
                  total: count
              }
          })
      }
  }

  
  return {
      ...repo,
      ...overridenMethods
  }
}