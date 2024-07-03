import App from "./App"
import PostPage from "./modules/PostPage/PostPage"
import HomePage from "./modules/HomePage/HomePage"
// import SignupPage from "./modules/SignupPage/SignupPage"
// import LoginPage from "./modules/LoginPage/LoginPage"

const routesConfig = ([
    {
      path: "/",
      element: <App />,
      children: [
        {index: true, element:<HomePage />},
        {path: ":id", element: <PostPage />}
        // {path: "login", element: <LoginPage />},
        // {path: "signup", element: <SignupPage />}
      ]
    }
  ])

  export default routesConfig