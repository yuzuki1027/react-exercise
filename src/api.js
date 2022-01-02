export async function fetchBrewpub(state) {
  const response = await fetch('https://api.openbrewerydb.org/breweries?by_state='+state+'&by_type=brewpub');
  const data = await response.json();
  return data.message;

  }
