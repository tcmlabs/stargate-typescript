import { gql } from "@apollo/client";
import { useInsertBookMutation } from "../generated/graphql";

const CREATE_BOOK_MUTATION = gql`
  mutation insertBook($title: String!, $author: String!) {
    book: insertBooks(value: { title: $title, author: $author }) {
      value {
        title
        author
      }
    }
  }
`;

export default function Submit() {
  const [insertBook, { loading }] = useInsertBookMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const title = formData.get("title").toString();
    const author = formData.get("author").toString();
    form.reset();

    insertBook({
      variables: { title, author },
      refetchQueries: ["allBooks"],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder="title" name="title" type="text" required />
      <input placeholder="author" name="author" type="author" required />
      <button type="submit" disabled={loading}>
        Submit
      </button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  );
}
