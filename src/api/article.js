import request from '@/utils/request'

// 获取面经列表
export const getArticleList = (current, pageSize) => {
  return request.get('/admin/interview/query', {
    params: {
      current,
      pageSize
    }
  })
}

// 添加面经
export const createArticle = ({ stem, content }) => {
  return request.post('/admin/interview/create', {
    stem,
    content
  })
}
