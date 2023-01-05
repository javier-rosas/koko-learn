import Error from 'next/error';

function Custom404() {
  return (
    <Error
      statusCode={404}
      title="Page Not Found"
      message="Sorry, the page you are looking for could not be found."
    />
  );
}

export default Custom404;