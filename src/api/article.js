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

// 根据id获取面经
export const getArticleById = (id) => {
  return request.get('/admin/interview/show', { params: { id } })
}

// 修改提交
export const updateArticle = ({ id, stem, content }) => {
  return request.put('/admin/interview/update', {
    id,
    stem,
    content
  })
}

// 删除面经
export const delArticle = (id) => {
  return request.delete('/admin/interview/remove', {
    data: { id }
  })
}
