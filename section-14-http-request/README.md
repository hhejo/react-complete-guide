# Section 14 HTTP Requests, DB



## Interact with DB

## Sending HTTP Requests, Using Responses

## Handling Errors, Loading State



브라우저에서 실행되는 JavaScript 코드가 DB와 직접 통신하면 안 됨

클라이언트 내부에서 DB에 직접 연결을 하면 DB의 인증 정보를 노출하게 됨

React App은 일반적으로 백엔드 서버 (백엔드 API)라고 불리는 서로 다른 URL로의 요청을 전송하는 서버와 통신

인증 정보는 백엔드 앱에 저장하고, 백엔드 앱과의 통신은 보안에 관련된 세부 사항이 필요 없기 때문에 DB와 안전하게 통신을 주고 받을 수 있음



## `fetch()`

promise 객체를 반환하므로 `then()`, `catch()`로 이어줌

`fetch(URL, {요청 옵션...})`

```javascript
// App.js
// ...
function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      });
  }
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
```

버튼을 누르면 백엔드 앱에 요청하고, 백엔드 앱은 DB 서버에 요청해서 다시 React App으로 응답



## `async`, `await`

함수 앞에 `async` 예약어 작성

promise를 반환하는 작업 앞에 `await` 예약어 사용

비교해보기

```javascript
// App.js
// ...
function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMoviesHandler() {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
```



## `try` `catch`

```javascript
// App.js
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
```



## `useEffect`, `useCallback`

```javascript
// App.js
import React, { useState, useEffect, useCallback } from "react";
// ...
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // ...
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  //////////
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  //////////
  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
```



## Firebase

-> Realtime Database 사용

코드는 따로 참고

