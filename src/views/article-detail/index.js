import React, { useState, useEffect } from 'react'
import { fetchArticleDetail } from '../../service'
import { message } from 'antd'
import LuckLoading from '../../components/luck-loading'
import MarkdownPreview from '../../components/markdown-preview'
import './index.scss'

message.config({ top: 200 })

function ArticleDetailView (props) {
  const [articleDetail, setArticleDetail] = useState({})

  const [fetching, setFetching] = useState(false)

  const { id } = props.match.params

  useEffect(() => {
    setFetching(true)
    const fetch = async () => {
      try {
        const data = await fetchArticleDetail(id)
        setArticleDetail(data)
        setFetching(false)
      } catch (errorMessage) {
        message.error(errorMessage)
        setFetching(false)
      }
    }
    fetch()
  }, [id])

  return (
    <>
      <LuckLoading loading={ fetching } />
      <div className="article__detail">
        <MarkdownPreview markdownString={ articleDetail.markdownString } />
      </div>
    </>
  )
}

export default ArticleDetailView






