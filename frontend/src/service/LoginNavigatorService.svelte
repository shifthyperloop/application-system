<script lang="ts">
  import {navigate, useLocation} from "svelte-navigator";
  import {loggedInStore} from "../store/authStore";

  const loginPaths = ["/login", "/signup"];
  const location = useLocation();

  loggedInStore.subscribe(value => {
    let loggedIn = !!value;
    if (!loggedIn && !loginPaths.includes($location.pathname)) {
      navigate("/login");
    } else if (loggedIn && loginPaths.includes($location.pathname)) {
      navigate("/");
    }
  });
</script>