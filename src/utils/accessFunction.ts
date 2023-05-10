export const accessFunction = (context: any) => {
  const cookies = context.req.cookies;
  const accessToken = cookies.accessToken;
  if (accessToken) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export const loginAccessFunction = (context: any) => {
  const cookies = context.req.cookies;
  const accessToken = cookies.accessToken;
  if (accessToken) {
    return {
      redirect: {
        destination: "/dashboard/companies",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
