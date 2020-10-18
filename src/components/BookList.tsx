import { gql, NetworkStatus } from "@apollo/client";
import { useAllBooksQuery } from "../generated/graphql";
import { ErrorMessage } from "./ErrorMessage";

export const ALL_BOOKS_QUERY = gql`
  query allBooks {
    books {
      values {
        title
        author
      }
    }
  }
`;

export const BookList: React.FC = () => {
  const { loading, error, data, networkStatus } = useAllBooksQuery({
    variables: {},
    notifyOnNetworkStatusChange: true,
  });

  const loadingMoreBooks = networkStatus === NetworkStatus.fetchMore;

  if (error) {
    return <ErrorMessage message="Error loading books." />;
  }
  if (loading && !loadingMoreBooks) {
    return <div>Loading</div>;
  }

  const books = data ? data.books?.values || [] : [];

  return (
    <section>
      <ul>
        {books.map((book, index) => (
          <li key={`${book.author}-${book.title}-${index}`}>
            <div>
              <span>{index + 1}. </span>
              {book.title ? (
                <a href={book.title}>{book.title}</a>
              ) : (
                <span>{book.title}</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  );
};
