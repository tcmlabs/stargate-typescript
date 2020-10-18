import { gql, useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

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

export const allBooksQueryVars = {
  skip: 0,
  first: 10,
};

export default function BookList() {
  const { loading, error, data, networkStatus } = useQuery(ALL_BOOKS_QUERY, {
    variables: allBooksQueryVars,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  const loadingMoreBooks = networkStatus === NetworkStatus.fetchMore;

  if (error) {
    return <ErrorMessage message="Error loading books." />;
  }
  if (loading && !loadingMoreBooks) {
    return <div>Loading</div>;
  }

  const { values: allBooks } = data.books;

  return (
    <section>
      <ul>
        {allBooks.map((book, index) => (
          <li key={book.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={book.url}>{book.title}</a>
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
}
