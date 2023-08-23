<script lang="ts">
  import { getAuthTokensViaGoogleAuth } from "$lib/authentications";
  import { PUBLIC_GOOGLE_CLIENT_ID } from "$env/static/public";

  const divId = "signin_with_google";

  async function googleCallback(response: any) {
    google.accounts.id.disableAutoSelect();
    getAuthTokensViaGoogleAuth(response.credential);
  }

  function initializeGoogleGIS() {
    google.accounts.id.initialize({
      client_id: PUBLIC_GOOGLE_CLIENT_ID,
      callback: googleCallback
    });

    google.accounts.id.renderButton(
      document.getElementById(divId)!,
      { type: "standard", theme: "outline", size: "large" }
    );
  }
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async defer on:load={ initializeGoogleGIS }></script>
</svelte:head>

<div id={divId}></div>
