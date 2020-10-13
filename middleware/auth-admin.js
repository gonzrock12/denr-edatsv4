export default function ({ $auth, redirect }) {
  const user = $auth.state.user
  if (user && user.is_admin) {
    // let user in
  } else {
    return redirect('/user')
  }
}
