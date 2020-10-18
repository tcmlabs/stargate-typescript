import { gql } from "@apollo/client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Books, Maybe, useInsertBookMutation } from "../generated/graphql";

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

type Mandatory<T> = {
  [Key in keyof T]: T[Key] extends Maybe<infer U> ? U : Key;
};

const makeBookFormBaseState = (): Mandatory<Books> => ({
  title: "",
  author: "",
});

export default function Submit() {
  const [insertBook, { loading }] = useInsertBookMutation();

  const [formState, setFormState] = useState<Mandatory<Books>>(
    makeBookFormBaseState()
  );

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const { title, author } = formState;

    if (!title || !author) {
      // TODO: handle invalid form
      return;
    }

    setFormState(makeBookFormBaseState());

    insertBook({
      variables: { title, author },
      refetchQueries: ["allBooks"],
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.persist(); // https://reactjs.org/docs/events.html#event-pooling

    setFormState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input
        placeholder="title"
        name="title"
        type="text"
        required
        value={formState.title}
        onChange={handleChange}
      />
      <input
        placeholder="author"
        name="author"
        type="author"
        required
        value={formState.author}
        onChange={handleChange}
      />
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
