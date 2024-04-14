import { Link, routes } from '@redwoodjs/router'

const Article = ({ article }) => {
  return (
    <article>
      <header>
        <h2 className="text-2xl font-semibold">
          <Link
            className="text-blue-700"
            to={routes.article({ id: article.id })}
          >
            {article.title}
          </Link>
        </h2>
      </header>
      <div className="mt-2 text-gray-900 font-light">{article.body}</div>
    </article>
  )
}

export default Article
